import {
	startAuthentication,
	startRegistration,
} from '@simplewebauthn/browser';
import {
	AuthenticatorTransportFuture,
	generateRegistrationOptions,
} from '@simplewebauthn/server';
import { isoUint8Array } from '@simplewebauthn/server/helpers';
import { SupabaseClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
import global from '@/global';
import { Database } from '@/database.types';

export async function listWebAuthnCredentialsForUser(
	client: SupabaseClient<Database>,
	userId: string,
) {
	const { data: credentials, count } = await client
		.from('credentials')
		.select('*', { count: 'exact' })
		.eq('user_id', userId);
	return { credentials, count };
}

export async function getWebAuthnCredentialByCredentialId(
	client: SupabaseClient<Database>,
	credentialId: string,
) {
	const { data: credentials } = await client
		.from('credentials')
		.select('*')
		.eq('credential_id', credentialId)
		.maybeSingle();
	return credentials;
}

export async function updateWebAuthnCredentialByCredentialId(
	client: SupabaseClient<Database>,
	credentialId: string,
	updates: Partial<Database['public']['Tables']['credentials']['Insert']>,
) {
	await client
		.from('credentials')
		.update(updates)
		.eq('credential_id', credentialId);
}

export async function deleteWebAuthnCredentialByCredentialId(
	client: SupabaseClient<Database>,
	credentialId: string,
) {
	await client.from('credentials').delete().eq('credential_id', credentialId);
}

export function insertWebAuthnChallenge(
	client: SupabaseClient<Database>,
	params: { user_id?: string; value: string },
) {
	if (params.user_id) {
		// Use upsert to insert or update the challenge
		return client
			.from('challenges')
			.upsert([params], { onConflict: 'user_id' })
			.select('*')
			.maybeSingle();
	} else {
		// Insert a new challenge without user_id
		return client
			.from('challenges')
			.insert([{ value: params.value }])
			.select('*')
			.maybeSingle();
	}
}

export async function getWebAuthnChallengeByUser(
	client: SupabaseClient<Database>,
	userId: string,
) {
	const { data: challenges } = await client
		.from('challenges')
		.select('*')
		.eq('user_id', userId)
		.single();
	return challenges;
}

export async function getWebAuthnChallenge(
	client: SupabaseClient<Database>,
	challengeId: string,
) {
	const { data: challenges } = await client
		.from('challenges')
		.select('*')
		.eq('id', challengeId)
		.maybeSingle();
	return challenges;
}

export async function deleteWebAuthnChallenge(
	client: SupabaseClient<Database>,
	challengeId: string,
) {
	await client.from('challenges').delete().eq('id', challengeId);
}

export async function getRegistrationOptions(
	client: SupabaseClient<Database>,
	user: any,
) {
	const { credentials } = await listWebAuthnCredentialsForUser(
		client,
		user.id,
	);
	const options = await generateRegistrationOptions({
		rpName: process.env.WEBAUTHN_RELYING_PARTY_NAME!,
		rpID: process.env.WEBAUTHN_RELYING_PARTY_ID!,
		userName: user.email,
		userID: isoUint8Array.fromASCIIString(user.id),
		userDisplayName: user.user_metadata.display_name,
		attestationType: 'none',
		authenticatorSelection: {
			residentKey: 'preferred',
			userVerification: 'preferred',
			authenticatorAttachment: 'platform',
		},
		excludeCredentials: credentials?.map((credential) => ({
			id: credential.credential_id,
			type: credential.credential_type,
			transports: credential.transports as AuthenticatorTransportFuture[],
		})),
	});

	return options;
}

export function saveWebAuthnCredential(
	client: SupabaseClient<Database>,
	credential: Database['public']['Tables']['credentials']['Insert'],
) {
	return client
		.from('credentials')
		.insert([credential])
		.select('*')
		.maybeSingle();
}

export async function createPasskey() {
	try {
		const options = await sendPOSTRequest('/api/passkeys/challenge');
		const credential = await startRegistration({
			optionsJSON: options,
		});
		const newPasskey = await sendPOSTRequest(
			'/api/passkeys/verify',
			credential,
		);
		if (!newPasskey) {
			throw new Error('No passkey returned from server');
		}
		return newPasskey;
	} catch (error) {
		if (error instanceof Error) {
			toast.error(error.message);
		}
		return null;
	}
}

async function sendPOSTRequest(url: string, data?: any) {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data || ''),
	});
	if (!response.ok) {
		throw new Error((await response.json()).message);
	}
	return await response.json();
}

export async function signInWithPasskey(useBrowserAutofill: boolean = false) {
	try {
		const options = await sendPOSTRequest('/auth/webauthn/passkey');
		const authenticationResponse = await startAuthentication({
			optionsJSON: options,
			useBrowserAutofill,
		});
		const { verified, user } = await sendPOSTRequest(
			'/auth/webauthn/passkey/verify',
			authenticationResponse,
		);
		if (!verified) {
			return false;
		}
		await sendPOSTRequest('/auth/webauthn/session', user);
		window.location.href = global.paths.dashboard;
	} catch (error) {
		if (error instanceof Error) {
			toast.error(error.message);
		}
	}
}

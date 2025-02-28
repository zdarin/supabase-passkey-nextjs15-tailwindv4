import {
	AuthenticatorTransportFuture,
	verifyAuthenticationResponse,
	VerifyAuthenticationResponseOpts,
} from '@simplewebauthn/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
	deleteWebAuthnChallenge,
	getWebAuthnChallenge,
	getWebAuthnCredentialByCredentialId,
	updateWebAuthnCredentialByCredentialId,
} from '@/lib/passkeys';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';

const urlKey = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
	const cookieStore = await cookies();
	const supabase = await createClient<Database>(urlKey, serviceRoleKey, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false,
		},
	});
	const challengeID = cookieStore.get('webauthn_state')?.value;
	const challenge = await getWebAuthnChallenge(supabase, challengeID!);
	await deleteWebAuthnChallenge(supabase, challengeID!);

	const data = await request.json();
	const credential = await getWebAuthnCredentialByCredentialId(
		supabase,
		data.id,
	);
	if (!credential) {
		return NextResponse.json(
			{ message: 'Could not sign in with passkey, No credential found' },
			{ status: 404 },
		);
	}

	const params: VerifyAuthenticationResponseOpts = {
		response: data,
		// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
		expectedChallenge: challenge?.value!,
		expectedOrigin: process.env.WEBAUTHN_RELYING_PARTY_ORIGIN!,
		expectedRPID: process.env.WEBAUTHN_RELYING_PARTY_ID!,
		credential: {
			id: credential.credential_id,
			publicKey: new Uint8Array(
				Buffer.from(credential.public_key, 'base64'),
			),
			counter: credential.sign_count,
			transports:
				credential.transports as unknown as AuthenticatorTransportFuture[],
		},
		requireUserVerification: false,
	};
	const verification = await verifyAuthenticationResponse(params);
	const { verified } = verification;

	const {
		data: { user },
	} = await supabase.auth.admin.getUserById(credential.user_id);

	if (verified) {
		await updateWebAuthnCredentialByCredentialId(
			supabase,
			credential.credential_id,
			{
				sign_count: verification.authenticationInfo.newCounter,
				last_used_at: new Date().toISOString(),
			},
		);
	}
	return NextResponse.json({ ...verification, user }, { status: 200 });
}

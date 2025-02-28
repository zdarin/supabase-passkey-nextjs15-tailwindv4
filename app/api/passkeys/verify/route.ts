/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { NextRequest, NextResponse } from 'next/server';
import {
	deleteWebAuthnChallenge,
	getWebAuthnChallengeByUser,
	saveWebAuthnCredential,
} from '@/lib/passkeys';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { Database } from '@/database.types';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		return NextResponse.json({ message: 'No User Found' }, { status: 404 });
	}
	const challenge = await getWebAuthnChallengeByUser(supabase, user.id);
	if (challenge) {
		await deleteWebAuthnChallenge(supabase, challenge.id);
	}

	const data = await request.json();
	const verification = await verifyRegistrationResponse({
		response: data,
		expectedChallenge: challenge?.value!,
		expectedOrigin: process.env.WEBAUTHN_RELYING_PARTY_ORIGIN!,
		expectedRPID: process.env.WEBAUTHN_RELYING_PARTY_ID,
	});
	const { verified } = verification;
	if (!verified) {
		return NextResponse.json(
			{ message: 'Verification failed' },
			{ status: 400 },
		);
	}

	const { registrationInfo } = verification;

	const values: Database['public']['Tables']['credentials']['Insert'] = {
		user_id: user.id,
		friendly_name: `Passkey created ${new Date().toLocaleString()}`,
		credential_type: registrationInfo?.credentialType!,
		credential_id: registrationInfo?.credential.id!,

		public_key: Buffer.from(
			registrationInfo?.credential.publicKey!,
		).toString('base64'),
		aaguid: registrationInfo?.aaguid,
		sign_count: registrationInfo?.credential.counter!,

		transports: data.response.transports ?? [],
		user_verification_status: registrationInfo?.userVerified
			? 'verified'
			: 'unverified',
		device_type:
			registrationInfo?.credentialDeviceType === 'singleDevice'
				? 'single_device'
				: 'multi_device',
		backup_state: registrationInfo?.credentialBackedUp
			? 'backed_up'
			: 'not_backed_up',
	};

	const { data: savedCredential } = await saveWebAuthnCredential(
		supabase,
		values,
	);
	const passkeyDisplayData = {
		credential_id: savedCredential?.credential_id,
		friendly_name: savedCredential?.friendly_name,

		credential_type: savedCredential?.credential_type,
		device_type: savedCredential?.device_type,
		backup_state: savedCredential?.backup_state,

		created_at: savedCredential?.created_at,
		updated_at: savedCredential?.updated_at,
		last_used_at: savedCredential?.last_used_at,
	};

	return NextResponse.json(passkeyDisplayData, {
		status: 201,
		headers: {
			Location: `/api/passkeys/${savedCredential?.id}`,
		},
	});
}

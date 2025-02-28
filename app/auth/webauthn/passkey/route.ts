import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { insertWebAuthnChallenge } from '@/lib/passkeys';
import { createClient } from '@/utils/supabase/server';

export async function POST() {
	const supabase = await createClient();
	const options = await generateAuthenticationOptions({
		rpID: process.env.WEBAUTHN_RELYING_PARTY_ID!,
		userVerification: 'preferred',
		allowCredentials: [],
	});

	const { data: challenge } = await insertWebAuthnChallenge(supabase, {
		value: options.challenge,
	});

	// Store the challenge ID in the "session"
	const cookieStore = await cookies();
	// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
	cookieStore.set('webauthn_state', challenge?.id!, {
		httpOnly: true,
		sameSite: true,
		secure: process.env.NODE_ENV === 'production',
	});

	return NextResponse.json(options, { status: 200 });
}

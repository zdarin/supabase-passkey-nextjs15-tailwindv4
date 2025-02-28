import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import {
	getRegistrationOptions,
	insertWebAuthnChallenge,
} from '@/lib/passkeys';

export async function POST() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		return NextResponse.json({ message: 'No User Found' }, { status: 404 });
	}
	const options = await getRegistrationOptions(supabase, user);

	await insertWebAuthnChallenge(supabase, {
		user_id: user.id,
		value: options.challenge,
	});
	return NextResponse.json(options, { status: 200 });
}

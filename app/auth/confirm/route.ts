import { type NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { type EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/server';
import global from '@/global';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get('token_hash');
	const type = searchParams.get('type') as EmailOtpType | null;
	const next = searchParams.get('redirect_to') ?? global.paths.dashboard;

	if (token_hash && type) {
		const supabase = await createClient();

		const { error } = await supabase.auth.verifyOtp({
			token_hash,
			type,
		});
		if (!error) {
			// redirect user to specified redirect URL or root of app
			redirect(next);
		}
	}

	// redirect the user to an error page with some instructions
	redirect('/error');
}

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import global from '@/global';

interface SignUpValues {
	email: string;
}

export async function signUp(values: SignUpValues) {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithOtp({
		email: values.email,
		options: {
			// set this to false if you do not want the user to be automatically signed up
			shouldCreateUser: true,
			emailRedirectTo: `http://localhost:3000/${global.paths.register}`,
		},
	});

	if (error) {
		redirect('/auth/error');
	}

	revalidatePath('/', 'layout');
	redirect(global.paths.authSignIn);
}

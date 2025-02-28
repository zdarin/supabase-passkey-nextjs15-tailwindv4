import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';

/**
 * @name useSignOut
 */
function useSignOut() {
	const supabase = createClient();
	const router = useRouter();

	return useCallback(async () => {
		await supabase.auth.signOut();
		router.refresh();
	}, [supabase.auth, router]);
}

export default useSignOut;

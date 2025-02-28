'use client';
import { Button } from '@/components/ui/button';
import useSignOut from '@/hooks/use-sign-out';

export default function SignOutButton() {
	const signOut = useSignOut();
	return (
		<>
			<Button className="w-full" onClick={signOut}>
				Sign Out
			</Button>
		</>
	);
}

'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import If from '@/components/ui/If';
import { Spinner } from '@/components/ui/spinner';
import { signInWithPasskey } from '@/lib/passkeys';
import { PasskeyIcon } from '@/components/icons/passkey-icon';

export default function SignInButton() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handlesignInWithPasskey = async () => {
		try {
			setLoading(true);
			await signInWithPasskey();
			router.refresh();
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			data-cy={'auth-provider-button'}
			onClick={handlesignInWithPasskey}
			className="w-full"
		>
			<span className={'flex items-center space-x-2'}>
				<If condition={!loading}>
					<PasskeyIcon className="size-5" />
				</If>
				<If condition={loading}>
					<Spinner className={'w-4'} />
				</If>
				<span>Sign In</span>
			</span>
		</Button>
	);
}

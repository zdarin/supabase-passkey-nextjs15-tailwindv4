'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import If from '@/components/ui/If';
import { createPasskey } from '@/lib/passkeys';
import { FingerprintIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import global from '@/global';

export default function CreatePasskeyButton() {
	const [creating, setCreating] = useState(false);
	const router = useRouter();

	const handleCreatePasskey = async () => {
		try {
			setCreating(true);
			await createPasskey();
			toast.success('Passkey created successfully');
			router.push(global.paths.dashboard);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		} finally {
			setCreating(false);
		}
	};

	return (
		<Button onClick={handleCreatePasskey} className="w-full">
			<span className={'flex items-center space-x-2'}>
				<If condition={!creating}>
					<FingerprintIcon className={'w-4'} />
				</If>
				<If condition={creating}>
					<Spinner className={'w-4'} />
				</If>
				<span>{creating ? 'Creating Passkey' : 'Create'}</span>
			</span>
		</Button>
	);
}

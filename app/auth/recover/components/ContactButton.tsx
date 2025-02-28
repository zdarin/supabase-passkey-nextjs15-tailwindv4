'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import If from '@/components/ui/If';
import { Spinner } from '@/components/ui/spinner';

export default function ContactButton() {
	const [creating, setCreating] = useState(false);

	const handleContact = async () => {
		try {
			setCreating(true);
			toast.success('Its only Toast Contacting with Administrator');
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		} finally {
			setCreating(false);
		}
	};

	return (
		<Button onClick={handleContact} className="w-full">
			<span className={'flex items-center space-x-2'}>
				<If condition={creating}>
					<Spinner className={'w-4'} />
				</If>
				<span>Contact</span>
			</span>
		</Button>
	);
}

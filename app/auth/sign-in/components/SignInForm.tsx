'use client';

import { cn } from '@/lib/utils';
import SignInButton from './SignInButton';

export default function SignInForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col items-center gap-2">
					<h1 className="font-poppins text-2xl font-bold">LOGO</h1>
				</div>
				<div className="flex flex-col gap-6">
					<div className="text-center text-sm">
						Welcome back, Sign In to your Account
					</div>
					<SignInButton />
				</div>
			</div>
			<div className="after:border-border relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
				<span className="bg-background text-muted-foreground relative z-10 px-2">
					Or
				</span>
			</div>
			<div className="text-center text-sm">
				Have problems with Passkey?{' '}
				<a
					href="/auth/recover"
					className="underline underline-offset-4"
				>
					Recover Account
				</a>
			</div>
			<div className="text-muted-foreground text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
				By continuing, you agree to our
				<br />
				<a href="/terms-of-service" className="hover:text-primary">
					Terms of Service
				</a>{' '}
				and{' '}
				<a href="/privacy-policy" className="hover:text-primary">
					Privacy Policy
				</a>
			</div>
		</div>
	);
}

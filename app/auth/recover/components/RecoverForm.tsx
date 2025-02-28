'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import ContactButton from './ContactButton';
import { UserIcon } from '@/components/icons/user-icon';

const list = [
	{
		title: 'Accidently deleted Passkey?',
		description:
			'If you accidently deleted Passkey from your device go to password manager and restore. Deleted Passkey should remain there for 30 days. ',
	},
	{
		title: 'Lost device?',
		description:
			'If you lost device you can Sign In with other device, where Passkey synced.',
	},
	{
		title: 'Lost all devices?',
		description:
			'If you have lost all of your devices contact Administrator.',
	},
];

export default function RecoverForm() {
	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex flex-col gap-6">
				<Card className="max-w-[400px] border-none shadow-none">
					<CardHeader>
						<CardTitle className="flex flex-col items-center justify-center">
							<UserIcon className="size-10" />
							Account recovery
						</CardTitle>
						<CardDescription className="text-center">
							How you can restore Passkey read below
						</CardDescription>
					</CardHeader>
					<CardContent>
						{list.map((list, index) => (
							<div
								key={index}
								className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
							>
								<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
								<div className="space-y-1">
									<p className="text-sm leading-none font-medium">
										{list.title}
									</p>
									<p className="text-muted-foreground text-sm">
										{list.description}
									</p>
								</div>
							</div>
						))}
					</CardContent>
					<CardFooter>
						<ContactButton />
					</CardFooter>
				</Card>

				<div className="after:border-border relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
					<span className="bg-background text-muted-foreground relative z-10 px-2">
						Or
					</span>
				</div>
				<div className="text-center text-sm">
					Go back to{' '}
					<a
						href="/auth/sign-in"
						className="underline underline-offset-4"
					>
						Sign In
					</a>
				</div>
			</div>
		</div>
	);
}

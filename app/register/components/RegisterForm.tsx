'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import CreatePasskeyButton from './CreatePasskeyButton';
import { PasskeyIcon } from '@/components/icons/passkey-icon';
import { LockIcon, ShieldCheckIcon, SparklesIcon } from 'lucide-react';

const list = [
	{
		title: 'What are passkeys?',
		description:
			'Passkeys are encrypted digital keys you create using your fingerprint, face, or screen lock.',
		icon: <ShieldCheckIcon className="size-4 text-blue-500" />,
	},
	{
		title: 'Why should I use passkeys?',
		description: `With passkeys, you don't need to remember complex passwords.`,
		icon: <SparklesIcon className="size-4 text-orange-500" />,
	},
	{
		title: 'Where are passkeys saved?',
		description:
			'Passkeys are saved to your password manager, so you can Sign In on other devices.',
		icon: <LockIcon className="size-4 text-green-500" />,
	},
];

export default function RegisterForm() {
	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<Card className="max-w-[400px] border-none shadow-none">
				<CardHeader>
					<CardTitle className="flex flex-col items-center justify-center">
						<PasskeyIcon className="size-10" />
						Create Passkey
					</CardTitle>
					<CardDescription className="text-center">
						The simplest and most secure way to Sign In to your
						Account
					</CardDescription>
				</CardHeader>
				<CardContent>
					{list.map((list, index) => (
						<div
							key={index}
							className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
						>
							<span className="flex translate-y-1">
								{list.icon}
							</span>
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
					<CreatePasskeyButton />
				</CardFooter>
			</Card>
		</div>
	);
}

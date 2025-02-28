'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import SignOutButton from './SignOutButton';

export default function WelcomeCard() {
	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<Card className="max-w-[400px] min-w-[400px] border-none shadow-none">
				<CardHeader>
					<CardTitle className="flex flex-col items-center justify-center">
						Dashboard
					</CardTitle>
					<CardDescription className="text-center">
						Manage your Passkeys
					</CardDescription>
				</CardHeader>
				<CardContent></CardContent>
				<CardFooter>
					<SignOutButton />
				</CardFooter>
			</Card>
		</div>
	);
}

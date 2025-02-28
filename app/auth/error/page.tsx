'use client';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function ErrorPage() {
	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<Card className="max-w-[400px] min-w-[400px] border-none shadow-none">
				<CardHeader>
					<CardTitle className="flex flex-col items-center justify-center text-xl">
						Oops, something went wrong!
					</CardTitle>
					<CardDescription className="text-center">
						We&apos;re sorry, but an unexpected error has occurred.
						Please try again later or contact support if the issue
						persists.
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button className="w-full" asChild>
						<a href="/auth/sign-in">Go to Sign In</a>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

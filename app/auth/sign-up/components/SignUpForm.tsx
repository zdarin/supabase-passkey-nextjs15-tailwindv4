'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { toast } from 'sonner';
import If from '@/components/ui/If';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { signUp } from '../actions';
import { SendIcon } from 'lucide-react';

const formSchema = z.object({
	email: z.string().email({
		message: 'Email entered wrong',
	}),
});

export default function SignUpForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	});

	const [loading, setLoading] = useState(false);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);
			await signUp(values);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col items-center gap-2">
							<h1 className="font-poppins text-xl font-bold">
								LOGO
							</h1>
							<div className="text-center text-sm">
								Enter your email below to join company
							</div>
						</div>
						<div className="flex flex-col gap-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="your@email.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								<If condition={!loading}>
									<SendIcon className="size-4" />
								</If>
								<If condition={loading}>
									<Spinner className="w-4" />
								</If>
								Send link
							</Button>
						</div>
					</div>
				</form>
			</Form>
			<div className="after:border-border relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
				<span className="bg-background text-muted-foreground relative z-10 px-2">
					Or
				</span>
			</div>
			<div className="text-center text-sm">
				Already have Account?{' '}
				<a
					href="/auth/sign-in"
					className="underline underline-offset-4"
				>
					Sign In
				</a>
			</div>
			<div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
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

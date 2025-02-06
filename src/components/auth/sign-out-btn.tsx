"use client";

import { LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";

interface SignOutButtonProps {
	className?: string;
}

export const SignOutButton = ({ className }: SignOutButtonProps) => {
	const router = useRouter();

	return (
		<Button
			color="red"
			variant="soft"
			className={cn(className)}
			onClick={async () => {
				await authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							router.push('/signin')
						},
					},
				});
			}}
		>
			<LogOut size={16} /> Sair
		</Button>
	)
}

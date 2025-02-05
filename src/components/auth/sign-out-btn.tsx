"use client";

import { LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';

export const SignOutButton = () => {
	const router = useRouter();

	return (
		<Button color="red" variant="soft" onClick={async () => {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						router.push('/signin')
					},
				},
			});
		}}>
			<LogOut size={16} /> Sair
		</Button>

	)
}

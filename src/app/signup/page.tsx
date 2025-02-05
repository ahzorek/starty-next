import SignInForm from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { Heading } from "@radix-ui/themes";
import Image from "next/image";

export default function SignInPage() {
	return (
		<div className="grid items-center justify-items-center min-h-screen p-6 gap-16 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center">
				<Heading size="8">Registrar-se</Heading>
				<SignUp />
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Documentação Next App Router
				</a>
			</footer>
		</div>
	);
};
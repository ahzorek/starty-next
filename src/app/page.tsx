import SignUp from "@/components/auth/sign-up";
import { UserService } from "@/services/UserService";
import { Code, Heading } from "@radix-ui/themes";
import Image from "next/image";

export default async function Home() {
  const userService = new UserService();
  const users = await userService.getAllUsers();
  return (
    <div className="grid items-center justify-items-center min-h-screen p-6 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          src="/starty.svg"
          alt="Starty Logo"
          width={180}
          height={38}
          priority
        />
        <Heading size="8">Starty v0.1</Heading>
        <code>Um starter baseado em Next15+ e Tailwind v4+</code>
        {
          !!users && users.length > 0
            ?
            <Code size="2">
              <pre className="p-4">
                {JSON.stringify(users, null, 2)}
              </pre>
            </Code>

            :
            <SignUp />
        }
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

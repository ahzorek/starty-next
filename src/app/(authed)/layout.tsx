import { Header } from "@/components/header";
import { Container } from "@radix-ui/themes";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6">
        <Container>
          {children}
        </Container>
      </main>
    </div>
  );
} 
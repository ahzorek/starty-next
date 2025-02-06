"use client";

import { Container, Flex } from "@radix-ui/themes";
import { UserMenu } from "./user-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Configurações",
    href: "/settings",
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="h-16 border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <Container>
        <Flex justify="between" align="center" height="100%">
          <Flex align="center" gap="6">
            <Link href="/dashboard">
              <Image
                src="/starty.svg"
                alt="Starty Logo"
                width={60}
                height={60}
                priority
              />
            </Link>
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors hover:text-black/80",
                    pathname === item.href ? "text-black font-medium" : "text-black/60"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </Flex>

          <UserMenu />
        </Flex>
      </Container>
    </header>
  );
} 
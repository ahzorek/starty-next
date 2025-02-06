"use client";

import { useSession } from "@/lib/auth-client";
import {
  Avatar,
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { SignOutButton } from "../auth/sign-out-btn";
import Link from "next/link";
import { User } from "lucide-react";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton variant="ghost">
          <Avatar
            size="2"
            radius="full"
            fallback={session.user.name?.charAt(0) as string}
            color="indigo"
          />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 400 }}>
        <Dialog.Title mb="4">Perfil do Usuário</Dialog.Title>

        <Flex direction="column" gap="4">
          <Flex gap="3" align="center">
            <Avatar
              size="5"
              radius="full"
              fallback={session.user.name?.charAt(0) as string}
              color="indigo"
            />
            <Flex direction="column">
              <Text as="div" size="2" weight="bold">
                {session.user.name}
              </Text>
              <Text as="div" size="2" color="gray">
                {session.user.email}
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="2">
            <Link href="/settings/profile" className="contents">
              <Button variant="soft" className="w-full justify-start gap-2">
                <User size={16} />
                Editar Perfil
              </Button>
            </Link>
            <SignOutButton className="w-full justify-start" />
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
} 
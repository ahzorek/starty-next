"use client"
import { useSession } from "@/lib/auth-client";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";

export const UserCard = () => {

  const { data: session } = useSession()

  return (
    <Box width="400px">
      <Card size="2">
        <Flex gap="4" align="center">
          <Avatar size="4" radius="full" fallback={session?.user.name.charAt(0) as string} color="indigo" />
          <Box>
            <Text as="div" weight="bold">
              {session?.user.name}
            </Text>
            <Text as="div" color="gray">
              {session?.user.email}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  )

}
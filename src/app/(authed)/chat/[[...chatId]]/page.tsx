import ChatInputForm from "./components/chat-input-form";
import { Grid, Heading, Section } from "@radix-ui/themes";

export const dynamic = 'force-dynamic'

export default async function ChatPage({ params }: { params: { chatId: string[] | undefined } }) {
  const chatId = await params.chatId?.[0] ?? crypto.randomUUID();
  return (
    <Grid gap="4">
      <Heading size="8" mb="2">Chat</Heading>
      <Section>
        <ChatInputForm chatId={chatId} />
      </Section>
    </Grid>
  )
}
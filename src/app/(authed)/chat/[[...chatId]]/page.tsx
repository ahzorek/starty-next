import ChatInputForm from "./components/chat-input-form";
import { ValueLoggerButton } from "@/components/value-logger-btn";
import { Code, Grid, Heading, Section, Text } from "@radix-ui/themes";

export const dynamic = 'force-dynamic'

export default async function ChatPage({ params }: { params: { chatId: string[] | undefined } }) {
  const chatId = params.chatId?.[0] ?? crypto.randomUUID();
  return (
    <Grid gap="4">
      <Heading size="8" mb="2">Chat</Heading>

      <Grid columns="2" gap="4">
        {/* Stats Section */}
        <Section>
          {/* <Heading size="4" mb="4">Chat</Heading> */}
          <ChatInputForm chatId={chatId} />
          {/* <Code size="1">
            <pre>
              {JSON.stringify(invertedAgentMessageList, null, 2)}
            </pre>
          </Code> */}
        </Section>

        {/* Activity Section */}
        <Section>
          <Heading size="4" mb="4">Messages</Heading>

          {/* {invertedAgentMessageList.map(m => {
            console.log("message: ", m)
            return (
              <Text mb="6" key={m.id} as="p" color="gray">
                <Code size="1">{m.constructor.name}</Code>
                {m.content as string}
              </Text>
            )
          })} */}
          {/* <Text as="p" color="gray">
            {agentNextState.messages[agentNextState.messages.length - 1].content as string}
          </Text> */}
        </Section>
      </Grid>
    </Grid>
  )
}
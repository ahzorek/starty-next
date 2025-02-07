'use client'

import { Button, Flex, TextArea, Text } from "@radix-ui/themes"
import { useActionState, useEffect, useRef, useState } from "react"
import { sendMessage } from "../actions"
import { toast } from "sonner"

export default function ChatInputForm({ chatId }: { chatId: string }) {
  const [message, setMessage] = useState('')
  const [messageHistory, setMessageHistory] = useState<string[]>([])
  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [state, formAction, isPending] = useActionState(sendMessage, {
    success: null
  })

  useEffect(() => {
    console.log('new state is: ', state)
    if (state.success) {
      setMessage('')
    }
    if (state.message) {
      setMessageHistory((prev: string[]) => [...prev, state.message as string])
    }
    if (!state.success) {
      toast.error(state.error)

    }
  }, [state])

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        className="sticky bottom-0 py-6"
      >
        <Flex direction="column" gap="3">
          {state?.error && (
            <Text color="red" size="2">
              {state.error}
            </Text>
          )}
          <input readOnly name="chatId" value={chatId} />
          <TextArea
            ref={textareaRef}
            name="message"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              resize: 'none',
              minHeight: '44px',
              maxHeight: '200px'
            }}
          />
          <Button
            loading={isPending}
            type="submit"
            disabled={!message.trim() || isPending}
            size="4"
          >
            Send
          </Button>
        </Flex>
      </form>
      <Flex direction="column" gap="3">
        {messageHistory && messageHistory.length > 0 && (
          messageHistory.map((m, index) => <p key={index}>{m}</p>)
        )}
      </Flex>
    </>
  )
}


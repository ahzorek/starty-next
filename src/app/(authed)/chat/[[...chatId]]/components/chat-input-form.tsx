'use client'

import { Button, Flex, TextArea, Text } from "@radix-ui/themes"
import { useActionState, useEffect, useRef, useState, useTransition, useCallback, RefObject } from "react"
import { useForm } from "react-hook-form"
import { sendMessage } from "../actions"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { chatValidator } from "@/validators/llm/chat.validator"
import { z } from "zod"
import { submitFormOnPressEnter } from "@/lib/utils"


export default function ChatInputForm({ chatId }: { chatId: string }) {
  const [messageHistory, setMessageHistory] = useState<string[]>([])
  const [isTransitionPending, startTransition] = useTransition()
  const [state, formAction, isActionPending] = useActionState(sendMessage, { success: null })
  const formRef = useRef<HTMLFormElement>(null);

  const { formState: { errors, isSubmitting }, watch, register, reset } = useForm<z.output<typeof chatValidator>>({
    resolver: zodResolver(chatValidator),
    defaultValues: {
      id: chatId,
      humanMessage: '',
    },
    mode: 'onChange',
  })

  const isFormPending = isTransitionPending || isActionPending || isSubmitting
  const messageValue = watch('humanMessage')

  useEffect(() => {
    if (!state.success && state.error) {
      toast.error(state.error)
    }
    if (state.success && state.message) {
      setMessageHistory((prev) => [...prev, state.message!])
      reset({ humanMessage: '' });
    }
  }, [state, reset])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      try {
        formAction(new FormData(formRef.current!))
      } catch (error) {
        toast.error('Failed to send message. Please try again.')
      }
    });
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="sticky bottom-0 py-6"
      >
        <Flex direction="column" gap="3">
          {errors.humanMessage && (
            <Text color="red" size="2">
              {errors.humanMessage.message}
            </Text>
          )}
          <input
            type="hidden"
            {...register('id')}
          />
          <TextArea
            {...register('humanMessage')}
            disabled={isFormPending}
            aria-busy={isFormPending}
            placeholder="Type your message..."
            onKeyDown={(e) => submitFormOnPressEnter(e, formRef, isFormPending, messageValue)}
            style={{
              resize: 'none',
              minHeight: '44px',
              maxHeight: '200px'
            }}
          />
          <Button
            type="submit"
            loading={isFormPending}
            disabled={isFormPending || !messageValue?.trim()}
            size="4"
          >
            Send
          </Button>
        </Flex>
      </form>
      <Flex direction="column" gap="3">
        {messageHistory.length > 0 ? (
          messageHistory.map((message, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-100"
              role="log"
              aria-live="polite"
            >
              {message}
            </div>
          ))
        ) : (
          <Text color="gray">Não há mensagens</Text>
        )}
      </Flex>
    </>
  )
}

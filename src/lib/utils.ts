import { clsx, type ClassValue } from "clsx";
import { RefObject } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Handles the submission of a form when the Enter key is pressed.
 *
 * @param {React.KeyboardEvent} event - The keyboard event triggered by the user.
 * @param {RefObject<HTMLFormElement | null>} formRef - A reference to the form element to be submitted.
 * @param {boolean} isPendingStatus - Indicates whether the form submission is currently pending.
 * @param {string} content - The content to be checked before submission.
 *
 * This function prevents the default action of the Enter key if the Shift key is not pressed,
 * checks if the content is not empty and if the submission is not pending, 
 * and then requests the form to submit.
 */
export function submitFormOnPressEnter(event: React.KeyboardEvent, formRef: RefObject<HTMLFormElement | null>, isPendingStatus: boolean, content: string) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    if (content.trim() && !isPendingStatus) {
      formRef.current?.requestSubmit();
    }
  }
}
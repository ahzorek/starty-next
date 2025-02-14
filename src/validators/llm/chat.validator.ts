import { z } from "zod";

export const chatValidator = z.object({
  id: z.string().uuid(),
  humanMessage: z.string().max(1000)
});

export type ChatValidatorType = z.infer<typeof chatValidator>;

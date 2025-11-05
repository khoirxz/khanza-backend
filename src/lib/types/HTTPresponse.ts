import { success, z } from "zod";

export const HTTPresponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  error: z.string().optional(),
});

export type HTTPResponseType = z.infer<typeof HTTPresponseSchema>;

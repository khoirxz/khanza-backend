import { z } from "zod";
import { HTTPresponseSchema } from "../../lib/types/HTTPresponse";

export const insertKehadiranPasienSchema = z.object({
  no_reg: z.string().min(1, "no_rawat is required"),
  createdAt: z.string().min(1, "createdAt is required"),
  updatedAt: z.string().optional(),
});

export type InsertKehadiranPasienInput = z.infer<
  typeof insertKehadiranPasienSchema
>;

export const KehadiranPasienResponseSchema = HTTPresponseSchema.extend({
  data: z
    .object({
      insertedId: z.string(),
    })
    .optional(),
});

export type KehadiranPasienResponseType = z.infer<
  typeof KehadiranPasienResponseSchema
>;

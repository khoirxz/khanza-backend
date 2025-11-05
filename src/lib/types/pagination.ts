import { z } from "zod";

export const paginatedResponseSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
  itemsPerPage: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;
export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(
  itemSchema: T
) {
  return z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    itemsPerPage: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
    data: z.array(itemSchema),
  });
}

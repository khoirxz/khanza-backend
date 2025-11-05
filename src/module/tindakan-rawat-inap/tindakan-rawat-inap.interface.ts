import { z } from "zod";
import { createPaginatedResponseSchema } from "../../lib/types/pagination";

export const TindakanRawatInapFilterParamsSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  kodeDokter: z.string().optional(),
  search: z.string().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.union([z.literal("ASC"), z.literal("DESC")]).optional(),
});

export type TindakanRawatInapFilterParams = z.infer<
  typeof TindakanRawatInapFilterParamsSchema
>;
// export type PaginationRawatInap = createPaginatedResponseSchema(TindakanRawatInapFilterParamsSchema);
// export type PaginatedRawatInap = z.infer<typeof TindakanRawatInapFilterParams>;

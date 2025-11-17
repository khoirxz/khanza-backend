import { z } from "zod";
import { createPaginatedResponseSchema } from "../../lib/types/pagination";

export const DokterSchema = z.object({
  kd_dokter: z.string(),
  nm_dokter: z.string(),
  jk: z.enum(["L", "P"]),
  tmp_lahir: z.string(),
  tgl_lahir: z.string(),
  gol_drh: z.string(),
  agama: z.string(),
  almt_tgl: z.string(),
  no_telp: z.string(),
  email: z.string(),
  stts_nikah: z.string(),
  kd_sps: z.string(),
  alumni: z.string(),
  no_ijn_praktek: z.string(),
  status: z.string(),
  spesialis: z.string()
});

export type DokterTypes = z.infer<typeof DokterSchema>;

export const DokterFilterParamsSchema = z.object({
  search: z.boolean().default(true),
  page: z.number().min(1).optional(),
  limit: z.number().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.union([z.literal("ASC"), z.literal("DESC")]).optional(),
});
export type DokterFilterParamsType = z.infer<typeof DokterFilterParamsSchema>;

export const PaginationDokter = createPaginatedResponseSchema(DokterSchema);
export type PaginationDokterType = z.infer<typeof PaginationDokter>;

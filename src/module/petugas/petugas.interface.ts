import { z } from "zod";
import { createPaginatedResponseSchema } from "../../lib/types/pagination";

export const PetugasSchema = z.array(
  z.object({
    nip: z.string(),
    nama: z.string(),
    jk: z.string(),
    tmp_lahir: z.string(),
    tgl_lahir: z.string(),
    gol_darah: z.string(),
    agama: z.string(),
    stts_nikah: z.string(),
    alamat: z.string(),
    kd_jbtn: z.string(),
    no_telp: z.string(),
    email: z.string(),
    status: z.string(),
  }),
);
export type Petugas = z.infer<typeof PetugasSchema>;

export const PetugasFilterParamsSchema = z.object({
  search: z.string().min(1).max(100).optional(),
  status: z.enum(["1", "0"]).default("1").optional(),
  page: z.number().min(1).optional(),
  limit: z.number().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.union([z.literal("ASC"), z.literal("DESC")]).optional(),
});
export type PetugasFilterParams = z.infer<typeof PetugasFilterParamsSchema>;

export const PaginationPetugasSchema =
  createPaginatedResponseSchema(PetugasSchema);
export type PaginationPetugas = z.infer<typeof PaginationPetugasSchema>;

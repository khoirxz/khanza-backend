import { z } from "zod";
import { createPaginatedResponseSchema } from "../../lib/types/pagination";

export const TindakanRawatInapSchema = z.object({
  nomor_rawat: z.string(),
  no_rkm_medis: z.string(),
  nama_dokter: z.string(),
  kd_dokter: z.string(),
  nama_pasien: z.string(),
  nama_petugas: z.string(),
  nip: z.string(),
  tanggal_perawatan: z.string(),
  jam_perawatan: z.string(),
  kode_jenis_perawatan: z.string(),
  nama_jenis_perawatan: z.string(),
  biaya_perawatan: z.number(),
  biaya_dokter: z.number(),
  biaya_perawat: z.number(),
  kso: z.number(),
  material: z.number(),
  bhp: z.number(),
  menejemen: z.number(),
});

export type TindakanRawatInap = z.infer<typeof TindakanRawatInapSchema>;

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
export const PaginationTindakanRawatInapSchema = createPaginatedResponseSchema(
  TindakanRawatInapSchema,
);
export type PaginationTindakanRawatInap = z.infer<
  typeof PaginationTindakanRawatInapSchema
>;

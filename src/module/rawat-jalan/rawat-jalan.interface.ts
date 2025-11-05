import { z } from "zod";
import { createPaginatedResponseSchema } from "../../lib/types/pagination";

export const RawatJalanModelSchema = z.object({
  no_reg: z.string(),
  no_rawat: z.string(),
  tgl_registrasi: z.date(),
  jam_reg: z.string(),
  kd_dokter: z.string(),
  nm_dokter: z.string(),
  no_rkm_medis: z.string(),
  nm_pasien: z.string(),
  nm_poli: z.string(),
  p_jawab: z.string(),
  almt_pj: z.string(),
  hubunganpj: z.string(),
  biaya_reg: z.number(),
  stts: z.string(),
  png_jawab: z.string(),
  umur: z.string(),
  status_bayar: z.string(),
  status_poli: z.string(),
  kd_pj: z.string(),
  kd_poli: z.string(),
  no_tlp: z.string(),
  no_sep: z.string().nullable(),
  no_surat: z.string().nullable(),
  tgl_rencana: z.string().nullable(),
  tgl_hadir: z.string().nullable(),
});

export type RawatJalanInterface = z.infer<typeof RawatJalanModelSchema>;

export const RawatJalanFilterParamsSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  kdPj: z.string().optional(),
  nmPoli: z.string().optional(),
  nmDokter: z.string().optional(),
  stts: z.string().optional(),
  statusBayar: z.string().optional(),
  search: z.string().optional(),
  semua: z.boolean().default(true),
  page: z.number().min(1).optional(),
  limit: z.number().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.union([z.literal("ASC"), z.literal("DESC")]).optional(),
});

export type RawatJalanFilterParams = z.infer<
  typeof RawatJalanFilterParamsSchema
>;

export const PaginationRawatJalan = createPaginatedResponseSchema(
  RawatJalanModelSchema
);
export type PaginationRawatJalanProps = z.infer<typeof PaginationRawatJalan>;

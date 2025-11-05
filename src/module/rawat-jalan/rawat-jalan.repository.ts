import { db } from "../../db";
import { QueryTypes } from "sequelize";

import {
  RawatJalanFilterParams,
  PaginationRawatJalanProps,
  type RawatJalanInterface,
} from "./rawat-jalan.interface";

import {
  buildOrderBy,
  buildWhereConditions,
  validateParams,
} from "./rawat-jalan.helper";

export class RawatJalanRepository {
  findAll = async (
    params: RawatJalanFilterParams
  ): Promise<PaginationRawatJalanProps> => {
    validateParams(params);

    const { page = 1, limit = 10, sortBy, sortOrder } = params;

    const offset = (page - 1) * limit;

    // Build WHERE conditions
    const { whereClause, queryParams } = buildWhereConditions(params);

    // Build ORDER BY
    const orderBy = buildOrderBy(sortBy, sortOrder);

    // Query untuk data
    const dataQuery = `
      SELECT 
        reg_periksa.no_reg,
        reg_periksa.no_rawat,
        reg_periksa.tgl_registrasi,
        reg_periksa.jam_reg,
        reg_periksa.kd_dokter,
        dokter.nm_dokter,
        reg_periksa.no_rkm_medis,
        pasien.nm_pasien,
        poliklinik.nm_poli,
        reg_periksa.p_jawab,
        reg_periksa.almt_pj,
        reg_periksa.hubunganpj,
        reg_periksa.biaya_reg,
        reg_periksa.stts,
        penjab.png_jawab,
        CONCAT(reg_periksa.umurdaftar, ' ', reg_periksa.sttsumur) AS umur,
        reg_periksa.status_bayar,
        reg_periksa.status_poli,
        reg_periksa.kd_pj,
        reg_periksa.kd_poli,
        pasien.no_tlp,
        bs.no_sep AS no_sep,
        bsk.no_surat AS no_surat,
        bsk.tgl_rencana AS tgl_rencana,
        rpa.createdAt AS tgl_hadir
      FROM reg_periksa
      INNER JOIN dokter ON reg_periksa.kd_dokter = dokter.kd_dokter
      INNER JOIN pasien ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis
      INNER JOIN poliklinik ON reg_periksa.kd_poli = poliklinik.kd_poli
      INNER JOIN penjab ON reg_periksa.kd_pj = penjab.kd_pj
      LEFT JOIN bridging_sep bs ON bs.no_rawat = reg_periksa.no_rawat
      LEFT JOIN bridging_surat_kontrol_bpjs bsk ON bsk.no_sep = bs.no_sep
      LEFT JOIN reg_periksa_absensi rpa ON rpa.no_reg = reg_periksa.no_rawat
      ${whereClause}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;

    // Query untuk count total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM reg_periksa
      INNER JOIN dokter ON reg_periksa.kd_dokter = dokter.kd_dokter
      INNER JOIN pasien ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis
      INNER JOIN poliklinik ON reg_periksa.kd_poli = poliklinik.kd_poli
      INNER JOIN penjab ON reg_periksa.kd_pj = penjab.kd_pj
      LEFT JOIN bridging_sep bs ON bs.no_rawat = reg_periksa.no_rawat
      LEFT JOIN bridging_surat_kontrol_bpjs bsk ON bsk.no_sep = bs.no_sep
      LEFT JOIN reg_periksa_absensi rpa ON rpa.no_reg = reg_periksa.no_rawat
      ${whereClause}
    `;

    // Eksekusi query secara parallel
    const [data, countResult] = await Promise.all([
      db.query(dataQuery, {
        replacements: [...queryParams, limit, offset],
        type: QueryTypes.SELECT,
      }),
      db.query(countQuery, {
        replacements: queryParams,
        type: QueryTypes.SELECT,
      }),
    ]);

    const totalItems = parseInt(
      (
        (countResult as Array<{ total: string | number }>)[0]?.total ?? "0"
      ).toString()
    );
    const totalPages = Math.ceil(totalItems / limit);

    return {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      data: data as RawatJalanInterface[],
    };
  };
}

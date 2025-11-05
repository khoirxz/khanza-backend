import { TindakanRawatInapRepository } from "./tindakan-rawat-inap.repository";
import { db } from "../../db";
import { TindakanRawatInapFilterParams } from "./tindakan-rawat-inap.interface";
import { QueryTypes } from "sequelize";

export class TindakanRawatInapService {
  private readonly repository: TindakanRawatInapRepository =
    new TindakanRawatInapRepository();

  getAll = async (params: TindakanRawatInapFilterParams) => {
    const {
      page = 1,
      limit = 10,
      sortBy = "rawat_jl_drpr.tgl_perawatan",
      sortOrder = "ASC",
      startDate,
      endDate,
    } = params;
    const offset = (page - 1) * limit;

    let whereClause = "";
    let queryParams: string[] = [];

    const conditions: string[] = [];

    if (params?.search) {
      conditions.push("dokter.nm_dokter LIKE ?");
      queryParams.push(`%${params.search}%`);
    }

    if (startDate) {
      conditions.push("rawat_jl_drpr.tgl_perawatan >= ?");
      queryParams.push(startDate);
    }

    if (endDate) {
      conditions.push("rawat_jl_drpr.tgl_perawatan <= ?");
      queryParams.push(endDate);
    }

    if (conditions.length > 0) {
      whereClause = `WHERE ${conditions.join(" AND ")}`;
    }

    const shortOrderBy = `ORDER BY ${sortBy} ${sortOrder}`;

    const query = `SELECT rawat_jl_drpr.no_rawat as nomor_rawat,
             dokter.nm_dokter as nama_dokter,
             pasien.nm_pasien as nama_pasien,
             petugas.nama as nama_petugas,
             rawat_jl_drpr.tgl_perawatan as tanggal_perawatan,
             rawat_jl_drpr.jam_rawat as jam_perawatan,
             rawat_jl_drpr.kd_jenis_prw as kode_jenis_perawatan,
             jns_perawatan.nm_perawatan as nama_jenis_perawatan,
             rawat_jl_drpr.biaya_rawat as biaya_perawatan,
             rawat_jl_drpr.tarif_tindakandr as biaya_dokter,
             rawat_jl_drpr.tarif_tindakanpr as biaya_perawat,
             rawat_jl_drpr.kso,
             rawat_jl_drpr.material,
             rawat_jl_drpr.bhp,
             rawat_jl_drpr.menejemen

           FROM rawat_jl_drpr
           INNER JOIN dokter ON rawat_jl_drpr.kd_dokter = dokter.kd_dokter
           INNER JOIN reg_periksa ON rawat_jl_drpr.no_rawat = reg_periksa.no_rawat
           INNER JOIN pasien ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis
           INNER JOIN petugas ON rawat_jl_drpr.nip = petugas.nip
           INNER JOIN jns_perawatan ON rawat_jl_drpr.kd_jenis_prw = jns_perawatan.kd_jenis_prw
           ${whereClause}

           ${shortOrderBy}
           LIMIT ${limit} OFFSET ${offset}`;

    const countQuery = `SELECT COUNT(*) as total FROM rawat_jl_drpr
           INNER JOIN dokter ON rawat_jl_drpr.kd_dokter = dokter.kd_dokter
           INNER JOIN reg_periksa ON rawat_jl_drpr.no_rawat = reg_periksa.no_rawat
           INNER JOIN pasien ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis
           INNER JOIN petugas ON rawat_jl_drpr.nip = petugas.nip
           ${whereClause}`;

    const [result, countResult] = await Promise.all([
      db.query(query, {
        replacements: queryParams,
        type: QueryTypes.SELECT,
      }),
      db.query(countQuery, {
        replacements: queryParams,
        type: QueryTypes.SELECT,
      }),
    ]);

    const totalItems = (countResult[0] as any).total;

    return {
      current_page: page,
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / limit),
      itemsPerPage: limit,
      hasNext: page < Math.ceil(totalItems / limit),
      hasPrev: page > 1,
      data: result,
      total: totalItems,
    };
  };
}

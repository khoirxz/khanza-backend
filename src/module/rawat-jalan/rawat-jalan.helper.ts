import { RawatJalanFilterParams } from "./rawat-jalan.interface";

// Validasi parameters
export const validateParams = (params: RawatJalanFilterParams): void => {
  if (!params.startDate || !params.endDate) {
    throw new Error("startDate and endDate are required");
  }

  if (params.page && params.page < 1) {
    throw new Error("Page must be greater than 0");
  }

  if (params.limit && (params.limit < 1 || params.limit > 100)) {
    throw new Error(`Limit must be between 1 and 100`);
  }
};

// Helper untuk build WHERE conditions
export const buildWhereConditions = (
  params: RawatJalanFilterParams
): {
  whereClause: string;
  queryParams: any[];
} => {
  const {
    startDate,
    endDate,
    kdPj = "%",
    nmPoli = "%",
    nmDokter = "%",
    stts = "%",
    statusBayar = "%",
    search = "%",
    semua = false,
  } = params;

  let whereClause = `
    WHERE reg_periksa.tgl_registrasi BETWEEN ? AND ?
    AND reg_periksa.status_lanjut = 'Ralan'
  `;

  const queryParams: any[] = [startDate, endDate];

  if (!semua) {
    whereClause += `
      AND reg_periksa.kd_pj LIKE ?
      AND poliklinik.nm_poli LIKE ?
      AND dokter.nm_dokter LIKE ?
      AND reg_periksa.stts LIKE ?
      AND reg_periksa.status_bayar LIKE ?
      AND (
        reg_periksa.no_reg LIKE ? OR
        reg_periksa.no_rawat LIKE ? OR
        reg_periksa.tgl_registrasi LIKE ? OR
        reg_periksa.kd_dokter LIKE ? OR
        dokter.nm_dokter LIKE ? OR
        reg_periksa.no_rkm_medis LIKE ? OR
        pasien.nm_pasien LIKE ? OR
        poliklinik.nm_poli LIKE ? OR
        reg_periksa.p_jawab LIKE ? OR
        penjab.png_jawab LIKE ? OR
        reg_periksa.almt_pj LIKE ? OR
        reg_periksa.status_bayar LIKE ? OR
        reg_periksa.hubunganpj LIKE ?
      )
    `;

    // Add filter parameters
    queryParams.push(kdPj, nmPoli, nmDokter, stts, statusBayar);

    // Add search parameters (15 times for each OR condition)
    for (let i = 0; i < 15; i++) {
      queryParams.push(search);
    }
  }

  return { whereClause, queryParams };
};

// Helper untuk build ORDER BY clause
export const buildOrderBy = (
  sortBy?: string,
  sortOrder?: "ASC" | "DESC"
): string => {
  const validSortFields = [
    "tgl_registrasi",
    "jam_reg",
    "nm_pasien",
    "nm_poli",
    "nm_dokter",
    "stts",
    "status_bayar",
    "no_reg",
    "no_rawat",
  ];

  const defaultSort =
    "reg_periksa.tgl_registrasi DESC, reg_periksa.jam_reg DESC";

  if (!sortBy) return defaultSort;

  // Security: Validate sort field to prevent SQL injection
  const safeSortBy = validSortFields.includes(sortBy)
    ? sortBy
    : "tgl_registrasi";
  const safeSortOrder = sortOrder === "ASC" ? "ASC" : "DESC";

  // Handle table prefixes for specific fields
  if (
    safeSortBy === "tgl_registrasi" ||
    safeSortBy === "jam_reg" ||
    safeSortBy === "no_reg" ||
    safeSortBy === "no_rawat"
  ) {
    return `reg_periksa.${safeSortBy} ${safeSortOrder}`;
  }

  return `${safeSortBy} ${safeSortOrder}`;
};

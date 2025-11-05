import { db } from "../../db";
import { QueryTypes } from "sequelize";
import { DokterTypes } from "./dokter.interface";

export class DokterRepository {
  fetchAll = async (): Promise<DokterTypes[]> => {
    const query = `SELECT * FROM dokter`;
    const result = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    return result as DokterTypes[];
  };

  fetchById = async (id: string): Promise<DokterTypes | null> => {
    const query = `SELECT * FROM dokter WHERE kd_dokter = :id`;
    const result = await db.query(query, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });

    return result.length > 0 ? (result[0] as DokterTypes) : null;
  };

  create = async (data: DokterTypes): Promise<DokterTypes | null> => {
    const query = `INSERT INTO dokter (kd_dokter, nm_dokter, jk,
      tmp_lahir, tgl_lahir, gol_drh, agama, almt_tgl, no_telp,
      email, stts_nikah, kd_sps, alumni, no_ijn_praktek, status) VALUES (:kd_dokter, :nm_dokter, :jk, :tmp_lahir, :tgl_lahir, :gol_drh, :agama, :almt_tgl, :no_telp, :email, :stts_nikah, :kd_sps, :alumni, :no_ijn_praktek, :status)`;
    const result = await db.query(query, {
      replacements: { ...data },
      type: QueryTypes.INSERT,
    });

    return result.length > 0 ? (result[0] as unknown as DokterTypes) : null;
  };

  update = async (
    id: string,
    data: DokterTypes,
  ): Promise<DokterTypes | null> => {
    const query = `UPDATE dokter SET nm_dokter = :nm_dokter,
      jk = :jk, tmp_lahir = :tmp_lahir, tgl_lahir = :tgl_lahir,
      gol_drh = :gol_drh, agama = :agama, almt_tgl = :almt_tgl,
      no_telp = :no_telp, email = :email, stts_nikah = :stts_nikah,
      kd_sps = :kd_sps, alumni = :alumni, no_ijn_praktek = :no_ijn_praktek,
      status = :status WHERE kd_dokter = :id`;
    const result = await db.query(query, {
      replacements: { id, ...data },
      type: QueryTypes.UPDATE,
    });

    return result.length > 0 ? (result[0] as unknown as DokterTypes) : null;
  };

  delete = async (id: string): Promise<{ message: string }> => {
    const query = `DELETE FROM dokter WHERE kd_dokter = :id`;
    const result = await db.query(query, {
      replacements: { id },
      type: QueryTypes.DELETE,
    });

    return { message: "Data berhasil dihapus" };
  };
}

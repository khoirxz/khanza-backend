import { db } from "../../db";
import { QueryTypes } from "sequelize";
import type {
  InsertKehadiranPasienInput,
  KehadiranPasienResponseType,
} from "./kehadiran-pasien.interface";

export class KehadiranPasienRepository {
  async insert(
    data: InsertKehadiranPasienInput
  ): Promise<KehadiranPasienResponseType> {
    const query = `INSERT INTO reg_periksa_absensi (no_reg, createdAt) VALUES (?, ?)`;
    const result = await db.query(query, {
      replacements: [data.no_reg, data.createdAt],
      type: QueryTypes.INSERT,
    });
    const insertedId = result[0].toString();

    return {
      success: true,
      message: "Kehadiran pasien recorded successfully",
      data: {
        insertedId,
      },
    };
  }

  async fetch(id: string) {
    const query = `SELECT * FROM reg_periksa_absensi WHERE no_reg = ? LIMIT 1`;
    const result = await db.query(query, {
      replacements: [id],
      type: QueryTypes.SELECT,
    });
    return result[0];
  }

  async update(id: string, data: Partial<InsertKehadiranPasienInput>) {
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(data);
    const query = `UPDATE reg_periksa_absensi SET ${fields} WHERE no_reg = ?`;
    await db.query(query, {
      replacements: [...values, id],
      type: QueryTypes.UPDATE,
    });
    return { message: "Kehadiran pasien updated successfully" };
  }

  async delete(id: string) {
    const query = `DELETE FROM reg_periksa_absensi WHERE no_reg = ?`;
    await db.query(query, {
      replacements: [id],
      type: QueryTypes.DELETE,
    });
    return { message: "Kehadiran pasien deleted successfully" };
  }
}

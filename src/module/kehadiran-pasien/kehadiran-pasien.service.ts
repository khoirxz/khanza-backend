import { db } from "../../db";
import { QueryTypes } from "sequelize";
import {
  InsertKehadiranPasienInput,
  KehadiranPasienResponseType,
} from "./kehadiran-pasien.interface";
import { KehadiranPasienRepository } from "./kehadiran-pasien.repository";
import { AppError } from "../../lib/helper/appError";

export class KehadiranPasienService {
  private readonly repository: KehadiranPasienRepository =
    new KehadiranPasienRepository();

  async insert(
    data: Omit<InsertKehadiranPasienInput, "createdAt">
  ): Promise<KehadiranPasienResponseType> {
    // cek id
    const checkId = await db.query(
      "SELECT no_rawat FROM reg_periksa WHERE no_rawat = ?",
      {
        replacements: [data.no_reg],
        type: QueryTypes.SELECT,
      }
    );

    if (checkId.length === 0) {
      throw new AppError("No_rawat tidak ditemukan", 404);
    }

    // set jam kehadiran
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const createdAt = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${formattedTime}`;

    // cek no_rawat sudah hadir atau belum
    const checkHadir = await this.repository.fetch(data.no_reg);
    if (checkHadir) {
      // update
      await this.repository.update(data.no_reg, {
        updatedAt: createdAt,
        createdAt: createdAt,
        no_reg: data.no_reg,
      });

      return {
        success: true,
        message: "Kehadiran pasien updated successfully",
        data: {
          insertedId: data.no_reg,
        },
      };
    }

    return this.repository.insert({
      no_reg: data.no_reg,
      createdAt: createdAt,
    });
  }

  async delete(id: string): Promise<KehadiranPasienResponseType> {
    // cek id
    const checkId = await db.query(
      "SELECT no_rawat FROM reg_periksa WHERE no_rawat = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    );

    if (checkId.length === 0) {
      throw new AppError("No_rawat tidak ditemukan", 404);
    }

    await this.repository.delete(id);

    return {
      success: true,
      message: "Kehadiran pasien deleted successfully",
    };
  }
}

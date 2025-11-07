import { db } from "../../db";
import { QueryTypes } from "sequelize";
import { Petugas } from "./petugas.interface";

export class PetugasRepository {
  fetchById = async (id: string): Promise<Petugas | null> => {
    const petugas = await db.query<Petugas>(
      "SELECT * FROM petugas WHERE id = :id",
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      },
    );
    return petugas[0] || null;
  };

  create = async (petugas: Omit<Petugas, "id">): Promise<Petugas> => {
    const result = await db.query(
      "INSERT INTO petugas (nama, email, password) VALUES (:nama, :email, :password)",
      {
        replacements: { ...petugas },
        type: QueryTypes.INSERT,
      },
    );
    const insertId = result[0] as number;
    return { ...petugas, id: insertId.toString() } as Petugas;
  };

  update = async (
    id: string,
    petugas: Partial<Petugas>,
  ): Promise<Petugas | null> => {
    const result = await db.query(
      "UPDATE petugas SET nama = :nama, email = :email, password = :password WHERE id = :id",
      {
        replacements: { ...petugas, id },
        type: QueryTypes.UPDATE,
      },
    );
    if (result[0] === 0) return null;
    return { ...petugas, id } as Petugas;
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await db.query("DELETE FROM petugas WHERE id = :id", {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
    return (result as unknown as number) > 0;
  };
}

import { QueryTypes } from "sequelize";
import { db } from "../../db";
import {
  PaginationPetugas,
  Petugas,
  PetugasFilterParams,
} from "./petugas.interface";
import { PetugasRepository } from "./petugas.repository";

export class PetugasService {
  private readonly repository = new PetugasRepository();
  async getAll(params: PetugasFilterParams): Promise<PaginationPetugas> {
    const { page = 1, limit = 10, sortBy = "nama", sortOrder = "ASC" } = params;
    const offset = (page - 1) * limit;

    let whereClause = "";
    let queryParams: string[] = [];

    if (params.search) {
      whereClause = "WHERE nama LIKE ?";
      queryParams = [`%${params.search}%`];
    }

    if (params.status) {
      whereClause += whereClause ? " AND " : "WHERE ";
      whereClause += "status = ?";
      queryParams.push(params.status);
    }

    const shortOrderBy = `ORDER BY petugas.${sortBy} ${sortOrder}`;

    const query = `SELECT petugas.* FROM petugas ${whereClause} ${shortOrderBy} LIMIT ${limit} OFFSET ${offset}`;

    const countQuery = `SELECT COUNT(*) as total FROM petugas ${whereClause}`;

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
      currentPage: page,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      itemsPerPage: limit,
      hasNext: page < Math.ceil(totalItems / limit),
      hasPrev: page > 1,
      data: result as Petugas[],
    };
  }

  create = async (data: Petugas): Promise<Petugas> => {
    const result = await this.repository.create(data);
    return result;
  };

  fetchById = async (id: string): Promise<Petugas | null> => {
    const result = await this.repository.fetchById(id);
    return result;
  };

  update = async (id: string, data: Petugas): Promise<Petugas | null> => {
    const result = await this.repository.update(id, data);
    return result;
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await this.repository.delete(id);
    return result;
  };
}

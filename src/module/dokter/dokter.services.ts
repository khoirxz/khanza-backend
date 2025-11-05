import { DokterRepository } from "./dokter.repository";
import {
  PaginationDokterType,
  DokterFilterParamsType,
  DokterTypes,
} from "./dokter.interface";
import { QueryTypes } from "sequelize";
import { db } from "../../db";

export class DokterService {
  private readonly repository = new DokterRepository();
  getAll = async (
    params: DokterFilterParamsType,
  ): Promise<PaginationDokterType> => {
    const {
      page = 1,
      limit = 10,
      sortBy = "nm_dokter",
      sortOrder = "ASC",
    } = params;
    const offset = (page - 1) * limit;

    let whereClause = "";
    let queryParams: string[] = [];

    if (params.search) {
      whereClause = `WHERE dokter.nm_dokter LIKE ?`;
      queryParams = [`%${params.search}%`];
    }

    const shortOrderBy = `ORDER BY dokter.${sortBy} ${sortOrder}`;

    const query = `SELECT dokter.* FROM dokter ${whereClause} ${shortOrderBy} LIMIT ${limit} OFFSET ${offset}`;

    const countQuery = `SELECT COUNT(*) as total FROM dokter ${whereClause}`;

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
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / limit),
      itemsPerPage: limit,
      hasNext: page < Math.ceil(totalItems / limit),
      hasPrev: page > 1,
      data: result as DokterTypes[],
    };
  };

  create = async (data: DokterTypes): Promise<DokterTypes | null> => {
    const result = await this.repository.create(data);
    return result;
  };

  fetchById = async (id: string): Promise<DokterTypes | null> => {
    const result = await this.repository.fetchById(id);
    return result;
  };

  update = async (
    id: string,
    data: DokterTypes,
  ): Promise<DokterTypes | null> => {
    const result = await this.repository.update(id, data);
    return result;
  };

  delete = async (id: string): Promise<{ message: string }> => {
    const result = await this.repository.delete(id);
    return result;
  };
}

import { Request, Response, NextFunction } from "express";
import { RawatJalanService } from "./rawat-jalan.services";
import { RawatJalanFilterParams } from "./rawat-jalan.interface";

export class RawatJalanController {
  private readonly service: RawatJalanService = new RawatJalanService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const params: RawatJalanFilterParams =
      req.query as unknown as RawatJalanFilterParams;

    const formatParams: RawatJalanFilterParams = {
      ...params,
      semua: params.semua === undefined ? true : params.semua,
      startDate:
        params.startDate === undefined
          ? new Date().toISOString().slice(0, 10)
          : params.startDate,
      endDate:
        params.endDate === undefined
          ? new Date().toISOString().slice(0, 10)
          : params.endDate,
    };
    try {
      res.status(200).json(await this.service.getAll(formatParams));
    } catch (error) {
      next(error);
    }
  };
}

import { Request, Response, NextFunction } from "express";
import { TindakanRawatInapService } from "./tindakan-rawat-inap.services";
import { TindakanRawatInapFilterParams } from "./tindakan-rawat-inap.interface";

export class TindakanRawatInapController {
  private readonly service: TindakanRawatInapService =
    new TindakanRawatInapService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: TindakanRawatInapFilterParams =
        req.query as unknown as TindakanRawatInapFilterParams;

      const formatParams: TindakanRawatInapFilterParams = {
        ...params,
        startDate:
          params.startDate === undefined
            ? new Date().toISOString().slice(0, 10)
            : params.startDate,
        endDate:
          params.endDate === undefined
            ? new Date().toISOString().slice(0, 10)
            : params.endDate,
      };

      const result = await this.service.getAll(formatParams);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

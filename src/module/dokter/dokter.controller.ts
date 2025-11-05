import { Request, Response, NextFunction } from "express";
import { DokterService } from "./dokter.services";
import { DokterFilterParamsType } from "./dokter.interface";

export class DokterController {
  private readonly service: DokterService = new DokterService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: DokterFilterParamsType =
        req.query as unknown as DokterFilterParamsType;
      const result = await this.service.getAll(params);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  fetchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await this.service.fetchById(id);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await this.service.update(id, data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await this.service.delete(id);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.service.create(data);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}

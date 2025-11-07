import { Request, Response, NextFunction } from "express";

import { PetugasService } from "./petugas.services";
import { PetugasFilterParams } from "./petugas.interface";

export class PetugasController {
  private readonly service: PetugasService = new PetugasService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: PetugasFilterParams =
        req.query as unknown as PetugasFilterParams;

      const result = await this.service.getAll(params);

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  };

  fetchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const result = await this.service.fetchById(id);

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const result = await this.service.create(data);

      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = req.body;

      const result = await this.service.update(id, data);

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const result = await this.service.delete(id);

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  };
}

import { Request, Response, NextFunction } from "express";
import { KehadiranPasienService } from "./kehadiran-pasien.service";

export class KehadiranPasienController {
  private readonly service: KehadiranPasienService =
    new KehadiranPasienService();

  insert = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.service.insert(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params!.id;
      const result = await this.service.delete(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

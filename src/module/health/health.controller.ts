import type { Request, Response, NextFunction } from "express";
import { HealthService } from "./health.services";
export class HealthController {
  private readonly services: HealthService = new HealthService();

  health = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send(await this.services.health());
    } catch (error) {
      next(error);
    }
  };
}

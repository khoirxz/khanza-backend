import express from "express";
import { HealthController } from "./health.controller";

const controller = new HealthController();
export const HealthRoutes: express.Router = express.Router();

HealthRoutes.get("/", controller.health);

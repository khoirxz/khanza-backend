import express from "express";
import { DokterController } from "./dokter.controller";

const controller = new DokterController();
export const DokterRoutes: express.Router = express.Router();

DokterRoutes.get("/", controller.getAll);
DokterRoutes.get("/:id", controller.fetchById);
DokterRoutes.post("/", controller.create);
DokterRoutes.put("/:id", controller.update);
DokterRoutes.delete("/:id", controller.delete);

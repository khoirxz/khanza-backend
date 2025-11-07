import express from "express";
import { PetugasController } from "./petugas.controller";

const controller = new PetugasController();
export const PetugasRoutes: express.Router = express.Router();

PetugasRoutes.get("/", controller.getAll);

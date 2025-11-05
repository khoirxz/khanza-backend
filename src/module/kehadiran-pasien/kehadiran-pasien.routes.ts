import express from "express";
import { KehadiranPasienController } from "./kehadiran-pasien.controller";

const controller = new KehadiranPasienController();
export const KehadiranPasienRoutes: express.Router = express.Router();

KehadiranPasienRoutes.post("/", controller.insert);
KehadiranPasienRoutes.delete("/:id", controller.delete);

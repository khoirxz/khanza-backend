import express from "express";
import { RawatJalanController } from "./rawat-jalan.controller";

const controller = new RawatJalanController();
export const RawatJalanRoutes: express.Router = express.Router();

RawatJalanRoutes.get("/", controller.getAll);

import express from "express";
import { TindakanRawatInapController } from "./tindakan-rawat-inap.controller";

const controller = new TindakanRawatInapController();
export const TindakanRawatInapRoutes: express.Router = express.Router();

TindakanRawatInapRoutes.get("/", controller.getAll);

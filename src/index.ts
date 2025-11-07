import express from "express";
import config from "./config";
import cors from "cors";

import { TindakanRawatInapRoutes } from "./module/tindakan-rawat-inap/tindakan-rawat-inap.routes";
import { DokterRoutes } from "./module/dokter/dokter.routes";
import { KehadiranPasienRoutes } from "./module/kehadiran-pasien/kehadiran-pasien.routes";
import { RawatJalanRoutes } from "./module/rawat-jalan/rawat-jalan.routes";
import { HealthRoutes } from "./module/health/health.routes";
import { errorHandler } from "./lib/helper/errorHandler";
import { PetugasRoutes } from "./module/petugas/petugas.routes";

// cors
const app = express();
const configData = config();

app.use(cors());
app.use(express.json());

app.use("/api/petugas", PetugasRoutes);
app.use("/api/tindakan-rawat-inap", TindakanRawatInapRoutes);
app.use("/api/dokter", DokterRoutes);
app.use("/api/kehadiran-pasien", KehadiranPasienRoutes);
app.use("/api/rawat-jalan", RawatJalanRoutes);
app.use("/api/health", HealthRoutes);

app.use(errorHandler);

app.listen(configData.PORT, () => {
  console.log(`Server is running on port http://localhost:${configData.PORT}`);
});

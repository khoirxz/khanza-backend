import { db } from "../../db";

export class HealthService {
  async health(): Promise<{ status: string; time: string; database: string }> {
    const connection =
      (await db
        .authenticate()
        .then(() => "Connected")
        .catch(() => "Disconnected")) || "Disconnected";
    return {
      status: "OK",
      time: new Date().toISOString(),
      database: connection,
    };
  }
}

const required = ["MONGO_URI", "JWT_SECRET"];

export function loadEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Eksik ortam değişkeni: ${missing.join(", ")}`);
  }

  return {
    port: Number(process.env.PORT) || 8080,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    nodeEnv: process.env.NODE_ENV || "development",
  };
}

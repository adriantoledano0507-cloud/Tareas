import express from "express";
import cors from "cors"; // 1. Mantenemos el import
import tareasRouter from "./routes/tareas.routes.js";
import { logger } from "./middleware/logger.js";

const app = express();
const PORT = 3000;

// --- MIDDLEWARES GLOBALES AL PRINCIPIO ---
// Activamos CORS primero para dar permisos al puerto 5173 de React
app.use(
  cors({ origin: ["http://localhost:5173", "http://localhost:4173"] })
);
app.use(express.json()); // Habilita la lectura de JSON en peticiones del body
app.use(logger);

// --- RUTAS ---
app.get("/", (req, res) => {
  res.json({
    nombre: "API de tareas",
    estado: "funcionando"
  });
});

app.use("/api/tareas", tareasRouter);

// --- MANEJO DE RUTAS NO ENCONTRADAS ---
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});



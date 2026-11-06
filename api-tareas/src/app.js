import express from "express";
import cors from "cors"; // 1. Mantenemos el import
import tareasRouter from "./routes/tareas.routes.js";
import { logger } from "./middleware/logger.js";

const app = express();

const origenes = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:4173"];
 
app.use(cors({ origin: origenes }));   // antes del middleware de x-api-key
app.use(express.json());
 
app.get("/", (req, res) => res.json({ estado: "ok" }));   // ruta de salud
 
// ... rutas y manejador de errores global
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));


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



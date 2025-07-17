/* import express from "express";
import movieRouths from "./routes/movie.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/movie", movieRouths);

app.listen(5001, () => {
  console.log("Servidor corriendo en el puerto 5001");
});
 */

import express from "express";
import movieRoutes from "./routes/movie.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Config para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Rutas de API primero
app.use("/api/movie", movieRoutes);

// Servir frontend estático
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Esto tiene que ir DESPUÉS de las rutas API, para que no las "coma"
// Solo para rutas que NO empiecen con /api, enviamos el index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(5001, () => {
  console.log("Servidor corriendo en el puerto 5001");
});

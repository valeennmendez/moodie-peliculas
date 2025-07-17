import express from "express"
import movieRouths from "./routes/movie.routes.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use("/api/movie", movieRouths)

app.listen(5001, () => {
    console.log("Servidor corriendo en el puerto 5001")
})
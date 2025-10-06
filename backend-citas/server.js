const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔹 Middleware
app.use(cors()); // habilita requests desde cualquier origen (puedes limitarlo si quieres)
app.use(express.json()); // parsea JSON automáticamente

// 🔹 Conectar a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/citasmedicas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB conectado"))
.catch(err => console.error("❌ Error Mongo:", err));

// 🔹 Rutas
app.use("/usuarios", require("./routes/usuarios"));
app.use("/citas", require("./routes/citas"));

// 🔹 Ruta raíz opcional
app.get("/", (req, res) => res.send("API de Citas Médicas 🔥"));

// 🔹 Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API corriendo en http://localhost:${PORT}`));

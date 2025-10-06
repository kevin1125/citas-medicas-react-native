const mongoose = require("mongoose");

// 🔹 Definimos el esquema de la cita
const CitaSchema = new mongoose.Schema({
  especialidad: {
    type: String,
    required: true,
    trim: true
  },
  doctor: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: String,
    required: true,
    trim: true
  },
  hora: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔹 Exportamos el modelo
module.exports = mongoose.model("Cita", CitaSchema);

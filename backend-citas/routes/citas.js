const express = require("express");
const router = express.Router();
const Cita = require("../models/Cita");
const { enviarCorreoCita } = require("../emailService");

// Crear cita y enviar correo
router.post("/", async (req, res) => {
  try {
    const nueva = new Cita(req.body);
    await nueva.save();

    // Enviar correo de confirmación
    const { nombre, email, doctor, fecha, hora } = req.body;
    await enviarCorreoCita(email, { nombre, doctor, fecha, hora });

    res.json({ ok: true, msg: "Cita creada y correo enviado ✅", cita: nueva });
  } catch (err) {
    console.error("❌ Error al crear cita:", err);
    res.status(400).json({ error: err.message });
  }
});

// Listar citas
router.get("/", async (req, res) => {
  try {
    const citas = await Cita.find();
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: "Error al listar citas" });
  }
});

module.exports = router;

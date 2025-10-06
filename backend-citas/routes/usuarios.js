const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

// 🔹 Registrar admin
router.post("/register-admin", async (req, res) => {
  try {
    let { usuario, password } = req.body;
    if (!usuario || !password)
      return res.status(400).json({ error: "Usuario y contraseña son requeridos" });

    usuario = usuario.toLowerCase(); // 🔹 normalizar usuario
    const existe = await Usuario.findOne({ usuario });
    if (existe) return res.status(409).json({ error: "Usuario ya existe" });

    const nuevoAdmin = new Usuario({ usuario, password, rol: "admin" });
    await nuevoAdmin.save();

    const { password: pwd, ...userData } = nuevoAdmin._doc;
    res.status(201).json({ message: "Admin creado", user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Registrar usuario normal
router.post("/register", async (req, res) => {
  try {
    let { usuario, password } = req.body;
    if (!usuario || !password)
      return res.status(400).json({ error: "Usuario y contraseña son requeridos" });

    usuario = usuario.toLowerCase();
    const existe = await Usuario.findOne({ usuario });
    if (existe) return res.status(409).json({ error: "Usuario ya existe" });

    const nuevoUsuario = new Usuario({ usuario, password, rol: "usuario" });
    await nuevoUsuario.save();

    const { password: pwd, ...userData } = nuevoUsuario._doc;
    res.status(201).json({ message: "Usuario creado", user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Login
router.post("/login", async (req, res) => {
  try {
    let { usuario, password } = req.body;
    if (!usuario || !password)
      return res.status(400).json({ error: "Usuario y contraseña son requeridos" });

    usuario = usuario.toLowerCase();
    const user = await Usuario.findOne({ usuario });
    if (!user) return res.status(401).json({ error: "Usuario o contraseña incorrectos" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Usuario o contraseña incorrectos" });

    const { password: pwd, ...userData } = user._doc;
    res.json({ message: "Login exitoso", user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

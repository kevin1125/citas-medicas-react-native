// emailService.js
const nodemailer = require("nodemailer");

// Configurar transporte de correo
const transporter = nodemailer.createTransport({
  service: "gmail", // También puede ser outlook, yahoo, etc.
  auth: {
    user: "kevinfalconi94@gmail.com",
    pass: "ggqccrkipumermxv", // App Password sin espacios
  },
});

// Función para enviar correo de cita
async function enviarCorreoCita(destinatario, datosCita) {
  const mailOptions = {
    from: "kevinfalconi94@gmail.com",
    to: destinatario,
    subject: "Confirmación de cita médica",
    text: `Hola ${datosCita.nombre}, tu cita fue agendada con éxito ✅

🩺 Doctor: ${datosCita.doctor}
📅 Fecha: ${datosCita.fecha}
⏰ Hora: ${datosCita.hora}

Por favor, llega 15 minutos antes.`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreoCita };

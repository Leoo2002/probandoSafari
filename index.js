const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET = "mi_secreto_ultrasecreto";
app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const usuario = { id: 1, nombre: "Leonel Replit" };
  const token = jwt.sign(usuario, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

app.get("/protegido", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token no enviado" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const datos = jwt.verify(token, SECRET);
    res.json({ mensaje: "Acceso concedido", datos });
  } catch (err) {
    res.status(403).json({ mensaje: "Token inválido" });
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`App en puerto ${listener.address().port}`);
});

const { PORT } = require("./config/env");
const router = require("./routes/index");

const express = require("express");
const cookieParser = require("cookie-parser");

const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/login", express.static(path.join(__dirname, "public/pages/login")));
app.use(
  "/bem-vindo",
  express.static(path.join(__dirname, "public/pages/welcome"))
);

app.use("/api", router);

app.use((err, req, res, next) => {
  res.status(400).json({
    success: 0,
    message: err.message || "Aconteceu algo de errado",
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

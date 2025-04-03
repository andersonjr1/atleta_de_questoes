const { PORT } = require("./config/env");
const router = require("./routes/index");
const { authTokenRedirect } = require("./middlewares/authMiddlewareRedirect");
const { openExamRedirect } = require("./middlewares/openExamRedirect");
const { isAdmin } = require("./middlewares/isAdminMiddleware");

const express = require("express");
const cookieParser = require("cookie-parser");

const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "not-authorized-user", "index.html")
  );
});

app.get("/registro", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "not-authorized-user", "index.html")
  );
});

app.get("/inicio", authTokenRedirect, openExamRedirect, (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "authorized-user", "index.html")
  );
});

app.get("/buscar", authTokenRedirect, (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "authorized-user", "index.html")
  );
});

app.get("/tool-add", authTokenRedirect, isAdmin, (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "authorized-user", "index.html")
  );
});

app.get("/simulado", authTokenRedirect, (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "authorized-user", "index.html")
  );
});

app.get("/aleatoria", authTokenRedirect, (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "authorized-user", "index.html")
  );
});

app.get("/aleatoria", authTokenRedirect, (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "authorized-user", "index.html")
  );
});

app.get("/ranking", authTokenRedirect, (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "authorized-user", "index.html")
  );
});

app.use("/api", router);

app.use((err, req, res, next) => {
  res.status(400).json({
    success: 0,
    message: err.message || "Aconteceu algo de errado",
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

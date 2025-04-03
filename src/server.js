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

app.use("/api", router);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "not-authorized-user", "index.html")
  );
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "not-authorized-user", "index.html")
  );
});

app.use((err, req, res, next) => {
  res.status(400).json({
    success: 0,
    message: err.message || "Aconteceu algo de errado",
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

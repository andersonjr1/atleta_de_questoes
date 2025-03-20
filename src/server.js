const { PORT } = require("./config/env");
const router = require("./routes/index");

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

app.get("/inicio", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "authorized-user", "index.html")
  );
});

// app.use("/login", express.static(path.join(__dirname, "public/pages/login")));

// app.use(
//   "/registro",
//   express.static(path.join(__dirname, "public/pages/register"))
// );

// app.use(
//   "/bem-vindo",
//   express.static(path.join(__dirname, "public/pages/welcome"))
// );

app.use("/api", router);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

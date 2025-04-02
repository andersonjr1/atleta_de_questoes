const { PORT } = require("./config/env");
const router = require("./routes/index");
const { authTokenRedirect } = require("./middlewares/authMiddlewareRedirect");

const express = require("express");
const cookieParser = require("cookie-parser");

const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', "pages" , "not-authorized-user" , 'index.html'));
});

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

app.get("/inicio", authTokenRedirect, (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "authorized-user", "index.html")
  );
});

app.use("/api", router);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const { PORT } = require("./config/env");
const router = require("./routes/index");

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
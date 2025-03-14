const { PORT } = require("./config/env");

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

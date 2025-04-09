const { PORT, ENV } = require("./config/env");
const router = require("./routes/index");
const { authTokenRedirect } = require("./middlewares/authMiddlewareRedirect");
const { openExamRedirect } = require("./middlewares/openExamRedirect");
const { isAdmin } = require("./middlewares/isAdminMiddleware");
const { swaggerDocs } = require("./utils/swagger");

const express = require("express");
const cookieParser = require("cookie-parser");

const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

swaggerDocs(app);

app.use("/api", router);

app.use("/images", express.static(path.join(__dirname, "src/public/images")));

if (ENV == "DEV") {
  app.get("/", (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "public",
        "pages",
        "not-authorized-user",
        "index.html"
      )
    );
  });

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "public",
        "pages",
        "not-authorized-user",
        "index.html"
      )
    );
  });
}

app.use((err, req, res, next) => {
  res.status(400).json({
    success: 0,
    message: err.message || "Aconteceu algo de errado",
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

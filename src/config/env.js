require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT || 5432;
const DB_HOST = process.env.DB_HOST || "192.168.0.1";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "1234";
const DB_NAME = process.env.DB_NAME || "banco";
const SECRET_KEY = process.env.SECRET_KEY || "this_password_is_not_secret";

module.exports = {
  PORT,
  DB_PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SECRET_KEY,
};

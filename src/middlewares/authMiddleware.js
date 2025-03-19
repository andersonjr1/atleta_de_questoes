const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/env.js");

const authToken = (req, res, next) => {
    try {
        const token = req.cookies.SESSION_ID;
        if(!token){
            return res.status(401).json({message: "Acesso negado! Usuário não autenticado"});
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({message: "Acesso negado! Token inválido ou expirado"});
    }
}

const isAdmin = (req, res, next) => {
    if(!req.user || req.user.role !== "Admin") {
        return res.status(403).json({message: "Acesso negado! Usuário não é administrador"});
    }

    next();
}

module.exports = {
    authToken,
    isAdmin
}
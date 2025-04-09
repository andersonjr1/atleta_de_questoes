const isAdmin = (req, res, next) => {
    if(!req.user || req.user.role !== "Admin") {
        return res.status(403).json({message: "Acesso negado! Usuário não é administrador"});
    }

    next();
}

module.exports = { 
    isAdmin 
}
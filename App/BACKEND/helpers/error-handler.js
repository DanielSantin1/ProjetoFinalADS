function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        // Erro de autenticação JWT
        return res.status(401).json({message: "The user is not authorized"})
    }

    if (err.name === 'ValidationError') {
        //  Erro de validação JWT
        return res.status(401).json({message: err})
    }

    // 500 Error default
    return res.status(500).json(err);
}

module.exports = errorHandler;
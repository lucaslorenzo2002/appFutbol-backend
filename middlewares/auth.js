const authMiddleware = (req, res, next) => {
    if(req.isAuthenticated()){
        
        next()
    }else{
        res.json({error: 'Error de autenticacion'})
    }
}

module.exports = authMiddleware
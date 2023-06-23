const authMiddleware = (req, res, next) => {
    if(req.isAuthenticated()){
        
        next()
    }else{
        res.json('HOLA')
    }
}

module.exports = authMiddleware
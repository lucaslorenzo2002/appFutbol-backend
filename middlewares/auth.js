const authMiddleware = (req, res, next) => {
    if(req.isAuthenticated()){
        
        next()
    }else{
        next()
    }
}

module.exports = authMiddleware
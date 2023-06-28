const authMiddleware = (req, res, next) => {
    if(req.isAuthenticated()){
        
        next()
    }else{
        res.json({error: ''})
    }
}

module.exports = authMiddleware
const jwt = require('jsonwebtoken');

const { connection } = require('../config/mongoConfig');
const UsersDAO = require('../database/users');
const usersDAO = new UsersDAO(connection);

const authMiddleware = async(req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await usersDAO.getUserById(decoded._id);
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  } else {
    res.status(401).json({ error: 'Se requiere autenticación' });
  }
};

module.exports = authMiddleware;
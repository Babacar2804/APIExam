// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Fonction middleware pour vérifier l'authentification
const authenticateUser = (req, res, next) => {
    // Récupérer le token d'authentification du header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // Vérifier si le token existe
    if (!token) {
        return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }

    // Vérifier le token
    jwt.verify(token, 'votre_secret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateUser };

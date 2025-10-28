const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");


//Routes accessibles à tous 
router.get("/", eventController.getAllEvents) //récupérer tous les evenements
router.get("/:id", eventController.getEventById);

// Route protégée pour la création (uniquement admin)
router.post('/', authMiddleware, (req, res, next) => {
    console.log(req.user.role)
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès réservé aux admins' });
    next();
}, eventController.createEvent);


module.exports = router;
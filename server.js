const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes"); // ✅ bon chemin

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes); // ✅ bon prefixe
app.get('/', (req, res) => {
    res.send('API Tickets Sale running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost${PORT}`));

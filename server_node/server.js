const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Connexion à MongoDB
console.log(process.env.SERVER_MONGO_URI);
mongoose.connect(process.env.SERVER_MONGO_URI, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  authSource: "admin"
})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.error("MongoDB connection error: ", err));

// Schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  date_naissance: { type: Date },
  ville: { type: String },
  code_postal: { type: String, maxlength: 5 }
});

// Modèle Mongoose pour les utilisateurs
const User = mongoose.model('utilisateurs', userSchema);

// Middleware pour authentifier
const authenticate = (req, res, next) => {
  const { password, admin } = req.query;
  if ((process.env.ADMIN_PASS !== password) && !admin) {
    return res.status(401).send({ detail: "Unauthorized" });
  }
  next();
};

// Lire tous les utilisateurs
app.get('/users', /* authenticate, */ async (req, res) => {
  try {
    const users = await User.find({}).exec();
    console.log(users);
    if (!users) {
      return res.status(404).send({ detail: "Users not found" });
    }
    res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// Lire un utilisateur spécifique
app.get('/users/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).exec();
    if (!user) {
      return res.status(404).send({ detail: "User not found" });
    }
    res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});


// Créer un utilisateur
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// Supprimer un utilisateur
app.delete('/users/:user_id', authenticate, async (req, res) => {
  try {
    const result = await User.findByIdAndRemove(req.params.user_id).exec();
    if (!result) {
      return res.status(404).send({ detail: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

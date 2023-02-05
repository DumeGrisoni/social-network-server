const router = require('express').Router();
const Creator = require('../models/Creator');
const bcrypt = require('bcrypt');

// Page d'inscription d'un créateur

router.post('/register', async (req, res) => {
  try {
    // Genere un mot de passe crypté
    const salt = await bcrypt.genSalt(15);
    const cryptedPassword = await bcrypt.hash(req.body.password, salt);

    // Crée un nouveau créateur
    const newCreator = await new Creator({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: cryptedPassword,
    });

    // Enregistre le créateur dans la base de données
    const creator = await newCreator.save();
    res.status(200).json(creator);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

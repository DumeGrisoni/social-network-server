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
    res.status(500).json(error);
  }
});

// Page de connexion d'un créateur

router.post('/login', async (req, res) => {
  try {
    const creator = await Creator.findOne({ email: req.body.email });
    !creator && res.status(404).json('Utilisateur non trouvé');
    req.send(creator);

    const isvalidPassword = await bcrypt.compare(
      req.body.password,
      creator.password
    );
    !isvalidPassword && res.status(400).json('Mot de passe incorrect');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

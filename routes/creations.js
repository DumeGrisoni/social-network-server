const router = require('express').Router();
const Creation = require('../models/Creation');

// Créer une création
router.post('/', async (req, res) => {
  const body = req.body;
  const newCreation = new Creation(body);
  try {
    const savedCreation = await newCreation.save();
    res.status(200).json(savedCreation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Modifier une création
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedCreation = await Creation.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      { new: true }
    );
    res.status(200).json(updatedCreation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Supprimer une création

// Liker une création

// Voir une création

// Voir toutes les créations

// Voir toutes les créations du créateur suivis

// Commenter une création

module.exports = router;

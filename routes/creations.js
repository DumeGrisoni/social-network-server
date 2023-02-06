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
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const creationId = req.body.creationId;
  if (creationId === id || req.body.isAdmin) {
    try {
      await Creation.findByIdAndDelete(id);
      res.status(200).json('La création a bien été supprimée');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('Vous ne pouvez supprimer que vos créations');
  }
});

// Liker une création
router.put('/:id/like', async (req, res) => {
  const id = req.body.creatorId;
  const creationId = req.params.id;

  try {
    const creation = await Creation.findById(creationId);
    if (!creation.likes.includes(id)) {
      await creation.updateOne({ $push: { likes: id } });
      res.status(200).json('La création a bien été liker');
    } else {
      res.status(403).json('Vous avez déjà liké cette création');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Dislike une création
router.put('/:id/dislike', async (req, res) => {
  const id = req.body.creatorId;
  const creationId = req.params.id;

  try {
    const creation = await Creation.findById(creationId);
    if (creation.likes.includes(id)) {
      await creation.updateOne({ $pull: { likes: id } });
      res.status(200).json('La création a bien été retirée des likes ');
    } else {
      res.status(403).json('Vous ne likez pas cette création');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Voir une création
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const creation = await Creation.findById(id);
    res.status(200).json(creation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Voir toutes les créations
router.get('/', async (req, res) => {
  try {
    const creations = await Creation.find();
    res.status(200).json(creations);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Voir toutes les créations d'un createur
router.get('/:id/creations', async (req, res) => {
  try {
    const creations = await Creation.find({ creatorId: req.params.id });
    res.status(200).json(creations);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Commenter une création

module.exports = router;

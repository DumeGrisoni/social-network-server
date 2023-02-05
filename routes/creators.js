const router = require('express').Router();
const Creator = require('../models/Creator');

//Modifier un créateur
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedCreator = req.body;

  if (req.body.creatorId === id || req.body.isAdmin) {
    //Si le mot de passe est modifié, on le crypte
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const creator = await Creator.findByIdAndUpdate(id, {
        $set: updatedCreator,
      });
      res.status(200).json('Le créateur à été mis a jour.');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('Vous ne pouvez modifier que votre compte.');
  }
});

//Supprimer un créateur
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  if (req.body.creatorId === id || req.body.isAdmin) {
    try {
      await Creator.findByIdAndDelete(id);
      res.status(200).json('Le créateur à été supprimé.');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('Vous ne pouvez supprimer que votre compte.');
  }
});

//Trouver un créateur
router.get('/:id', async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.id);
    const { password, updatedAt, ...other } = creator._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Ajouter un abonné

router.put('/:id/follow', async (req, res) => {
  const id = req.params.id;
  const creatorId = req.body.creatorId;

  if (id !== req.body.creatorId) {
    try {
      const creator = await Creator.findById(id);
      const currentCreator = await Creator.findById(creatorId);

      if (!creator.followers.includes(creatorId)) {
        await currentCreator.updateOne({ $push: { followings: id } });
        await creator.updateOne({ $push: { followers: creatorId } });
        res.status(200).json('Vous êtes maintenant abonné à ce créateur.');
      } else {
        res.status(401).json('Vous êtes déjà abonné à ce créateur.');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json('Vous ne pouvez pas vous abonner à ce créateur.');
  }
});
module.exports = router;

//Retirer un abonné

router.put('/:id/unfollow', async (req, res) => {
  const id = req.params.id;
  const creatorId = req.body.creatorId;

  if (id !== req.body.creatorId) {
    try {
      const creator = await Creator.findById(id);
      const currentCreator = await Creator.findById(creatorId);

      if (creator.followers.includes(creatorId)) {
        await currentCreator.updateOne({ $pull: { followings: id } });
        await creator.updateOne({ $pull: { followers: creatorId } });
        res.status(200).json('Vous êtes maintenant désabonné de ce créateur.');
      } else {
        res.status(401).json("Vous n'êtes pas abonné à ce créateur.");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json('Vous ne pouvez pas vous désabonner de ce créateur.');
  }
});

//Imports
const db = require("../models");

//Midlleware

//Récuperations de tout les comptes
exports.getAllUsers = (req, res) => {
  db.User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(404).json({ error }));
};

//Récupération d'un compte
exports.getUser = (req, res) => {
  db.User.findOne({
    attributes: { exclude: ["password"] },
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(404).json({ error }));
};

// Modification d'un compte
exports.updateUser = (req, res) => {
  db.User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user) {
        user
          .update({
            bio: req.body.bio ? req.body.bio : user.bio,
            picture: req.body.picture ? req.body.picture : user.picture,
          })
          .then(() =>
            res.status(201).json({ message: "profil mis à jour !" })
          )
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé !" });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

//Supression d'un compte
exports.deleteUser = (req, res) => {
  db.User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

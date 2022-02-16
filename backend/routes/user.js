//Imports
const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Authentification
router.post("/register", authCtrl.signUp);
router.post("/login", authCtrl.signIn);

//CRUD USER
router.get("/all", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getUser);
router.put("/:id", auth, multer, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);
// router.get("/me", auth, userCtrl.getMe) - Conflit avec gtUser

module.exports = router;

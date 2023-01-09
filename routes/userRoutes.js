const router = require("express").Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get("/", userController.getUser);
//router.get("/:id", userController.getUserById);
router.get("/create", userController.createUser)


module.exports = router;
const router = require("express").Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });


//router.get("/:id", userController.getUserById);
router.get("/", userController.getUser);
router.post("/", urlencodedParser, userController.createUser);
router.get("/:name", urlencodedParser, userController.getUserName);
router.delete('/:name', userController.deleteUser)

module.exports = router;
const router = require("express"). Router();
const UserController = require("../controllers/userController");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//const { BadRequest, NotFound } = require('../utils/errors');

//router.get("/:id", TaskController.getTaskById);
//router.post("/", urlencodedParser, UserController.logUserIn);


router.get("/", UserController.getAllUsers);  //not necessary to have "/tasks", actually must remove it or will duplicate the path /tasks/tasks
router.post("/", urlencodedParser, UserController.createUser);

router.get("/:name", UserController.getUserByName);
router.delete('/:name', UserController.deleteUser);

module.exports = router;

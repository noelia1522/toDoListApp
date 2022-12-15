const router = require("express").Router();
const TaskController = require("../controllers/taskController");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", TaskController.getTasks);
router.get("/", TaskController.getTaskById);
router.post("/", urlencodedParser, TaskController.createTasks);

module.exports = router;
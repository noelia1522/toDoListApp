const router = require("express"). Router();
const TaskController = require("../controllers/taskControllerdb");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//const { BadRequest, NotFound } = require('../utils/errors');

//router.get("/:id", TaskController.getTaskById);
router.get("/", TaskController.getTasks);  //not necessary to have "/tasks", actually must remove it or will duplicate the path /tasks/tasks
router.post("/", urlencodedParser, TaskController.createTask);

router.delete("/remove", urlencodedParser, TaskController.deleteTask);
router.post("/deleteAll", urlencodedParser, TaskController.deleteAll); //why aren0t we using the delete?? but post instead?

module.exports = router;



/*

Old routes without db
const router = require("express").Router();
const TaskController = require("../controllers/taskController");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", TaskController.getTasks);
router.get("/", TaskController.getTaskById);
router.post("/", urlencodedParser, TaskController.createTasks);

module.exports = router;

*/
const router = require("express").Router();
const taskControllerdb = require("../controllers/taskControllerdb");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended:false});

router.get("/", taskControllerdb.getTasks);
router.post("/",urlencodedParser, taskControllerdb.createTasks);
router.delete("/",urlencodedParser, taskControllerdb.removeTask);
router.post("/tasks/deleteall",urlencodedParser,taskControllerdb.deleteAll);
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
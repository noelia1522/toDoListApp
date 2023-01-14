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

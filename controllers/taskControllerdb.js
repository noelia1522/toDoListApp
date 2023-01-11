const fs = require("fs");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const taskModel = require("../models/taskModel");



/////////////////////   CREATE TASK   //////////////////////

async function createTasks(req, res) {
    const task1 = await taskModel.create({

    })
    res.redirect("/")
}


//escribe en la File la newTask haciendo stringify para devolverlo al formato string
fs.writeFile("./public/storage.json", JSON.stringify(taskJSON, null, 2), (err) => {
    if (err) console.log("Error");
    else console.log("Task is added to the storage file!");
})
res.redirect("/tasks");
}



////////////////////  GET TASKS   //////////////////////////


//para hacer el display de las tasks 
function getTasks(req, res) {
    let taskDatabaseJSON = fs.readFileSync("./public/storage.json");
    const taskJSON = JSON.parse(taskDatabaseJSON);
    res.render("index", task = taskJSON);
}



////////////////////// GET TASK ID ///////////////////////
function getTaskById(req, res) {
    let taskDataBaseJSON = fs.readFileSync("./public/storage.json");
    const taskJSON = JSON.parse(taskDataBaseJSON);
    const task = _.find(taskJSON, ["id", req.params.id]);
    res.send(task);
}


module.exports = { getTaskById, getTasks, createTasks }
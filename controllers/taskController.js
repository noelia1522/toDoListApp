const fs = require("fs");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");



/////////////////////   CREATE TASK   //////////////////////

function createTasks(req, res) {
    console.log(req.body.newTask);
    let newTask = {
        id: uuidv4(),
        text: req.body.newTask,
        completed: false
    };
    //taskDataBaseJSON almacena los strings de task que se introducen
    let taskDatabaseJSON = fs.readFileSync("public/storage.json");

    //asignas taskJSON a los elementos de taskDatabaseJSON
    //y con el parse coge los string del documento storage y los transforma en un array para poder hacer el push de los elementos nuevos.
    const taskJSON = JSON.parse(taskDatabaseJSON);
    console.log(taskJSON);
    taskJSON.push(newTask);

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
function getTaskById(req,res){
    let taskDataBaseJSON= fs.readFileSync("./public/storage.json");
    const taskJSON = JSON.parse(taskDataBaseJSON);
    const task = _.find(taskJSON,["id", req.params.id]);
    res.send(task);
}


module.exports = {getTaskById, getTasks, createTasks }
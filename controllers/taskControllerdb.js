const fs = require("fs");
const _ = require("lodash");
const taskModel = require("../models/taskModel");


/////////////////////   CREATE TASK   //////////////////////

async function createTasks(req, res) {
    const create_task = await taskModel.create({
        task: req.body.newTask
    })
    res.redirect("/tasks");
   
}


////////////////////  GET TASKS   //////////////////////////


//para hacer el display de las tasks 
async function getTasks(req, res) {
    const display_task =await taskModel.find({});
    
    res.render('index', {task: display_task});
}



////////////////////// REMOVE TASK + DELETE MORE THAN 1 TASK BUT NOT ALL///////////////////////
async function removeTask(req, res) {
    
    const completeTask = req.body.ids;
console.log(completeTask);
    if(completeTask.length>1) {        //if more than one tasks selected, then we deal with array     
        for (task of completeTask) {
            await taskModel.deleteOne( {task: task}, 
                
                function (error){
               
                if (error) console.log(error);
               
                res.redirect("/tasks");
            });
        }
    }
    else {
        await taskModel.deleteOne( {task: completeTask[0]}, function(error){
            if (error) console.log(error);
            res.redirect("/tasks");
        });
    }
};


//////////////////// DELETE ALL TASKS //////////////////////
function deleteAll(req, res) {
    taskModel.deleteMany({})
    .then(() => {
        res.redirect("/tasks");
    })
    .catch(error => {
        console.log(error);
        next(error);
    });
};



module.exports = { deleteAll, getTasks, createTasks,removeTask }


/*
task controller without db
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


module.exports = {getTaskById, getTasks, createTasks }*/
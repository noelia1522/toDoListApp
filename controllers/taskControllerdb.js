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
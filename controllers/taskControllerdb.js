const fs = require("fs");
const _ = require("lodash");
const taskModel = require("../models/taskModel");



/////////////////////   CREATE TASK   //////////////////////

async function createTasks(req, res) {
    const task1 = await taskModel.create({
        text: req.body.newTask
    })
    res.redirect("/tasks");
    console.log(task1);
}




////////////////////  GET TASKS   //////////////////////////


//para hacer el display de las tasks 
async function getTasks(req, res) {
    const task =await taskModel.find({});
    console.log(task);
    res.render('index', {task: task});
}



////////////////////// GET TASK ID ///////////////////////
function deleteTask(req, res) {



module.exports = { getTaskById, getTasks, createTasks }
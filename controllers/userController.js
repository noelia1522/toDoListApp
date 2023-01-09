const {v4: uuidv4}= require("uuid");
const fs = require("fs");
const _ = require("lodash");
const userModel = require("../models/userModel")

async function getUser(req,res){
    const users = await userModel.find({});
    //const users = await userModel.findOne({age:gt});
    console.log(users);
    console.log("algo");
    res.send(users);
   /* let userDatabaseJSON = fs.readFileSync("./public/storage.json");
    const userJSON=JSON.parse(userDatabaseJSON);
    res.render("user", user=userJSON);*/
}

function getUserId(req,res){

    /*
    let userDatabaseJSON= fs.readFileSync("./public/storage.json");
    const userJSON= JSON.parse(userDatabaseJSON);
    const user = _.find(userJSON,["id", req.params.id]);
    res.send(user);*/
}

async function createUser(req,res){
    const user1 = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age

})
console.log(user1);
console.log("User1 is created")}
;

    /*
    console.log("new user is :", req.body.newuser); 
    let newUser = {
        id: uuidv4(),
        text: req.body.newTask,
        completed: false
    };
    let userDatabaseJSON=fs.readFileSync("./public/storage.json");
    const userJSON= JSON.parse(userDatabaseJSON);
    console.log(userJSON);
    userJSON.push(newUser);
    fs.writeFile("./public/storage.json", JSON.stringify(userJSON,null,2),(err)=>{
        if(err) console.log("Error");
        else console.log("User is added to the storage file!");
    })*/



module.exports = {getUser,getUserId,createUser};
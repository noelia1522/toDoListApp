const {v4: uuidv4}= require("uuid");
const fs = require("fs");
const _ = require("lodash");

function getUser(req,res){
    let userDatabaseJSON = fs.readFileSync("./public/storage.json");
    const userJSON=JSON.parse(userDatabaseJSON);
    res.render("user", user=userJSON);
}

function getUserId(req,res){
    let userDatabaseJSON= fs.readFileSync("./public/storage.json");
    const userJSON= JSON.parse(userDatabaseJSON);
    const user = _.find(userJSON,["id", req.params.id]);
    res.send(user);
}

function createUser(req,res){
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
    })

}

module.exports = {getUser,getUserId,createUser};
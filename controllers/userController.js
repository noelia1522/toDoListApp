const {v4: uuidv4}= require("uuid");
const fs = require("fs");
const _ = require("lodash");
const userModel = require("../models/userModel")

async function getUser(req,res){
    const users = await userModel.find({});
    //const users = await userModel.findOne({age: {$gt:30}});
    console.log(users);
    res.send(users);
   /* let userDatabaseJSON = fs.readFileSync("./public/storage.json");
    const userJSON=JSON.parse(userDatabaseJSON);
    res.render("user", user=userJSON);*/
}

async function getUserName(req,res){
    const user= await userModel.findOne({name: req.params.name})
    user.parent = "63bd38ae9388174f2165a904";
    await user.save();
    res.send(user);
    
    /*
    let userDatabaseJSON= fs.readFileSync("./public/storage.json");
    const userJSON= JSON.parse(userDatabaseJSON);
    const user = _.find(userJSON,["id", req.params.id]);
    res.send(user);*/
}

async function createUser(req,res){
    const user1 = await userModel.create({
//aqui coges los valores del input (html) extraidos de lo que insertas en la pagina
//es la parte del user_name, user_email etc lo que tiene que coincidir con el html
    name: req.body.user_name,
    email: req.body.user_email,
    age: req.body.user_age

})
console.log(user1);
console.log("User1 is created")
res.redirect("/");
}


async function deleteUser(req, res) {


    const user = await userModel.deleteOne({name: req.params.name});
    console.log(user);
    
    res.json({message: "User deleted!"});
    
    //ADD ERROR HANDLING IN TRY/CATCH!
}




module.exports = {getUser,createUser,getUserName, deleteUser};


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



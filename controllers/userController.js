const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const _ = require("lodash");
const userModel = require("../models/userModel");
const { BadRequest, NotFound } = require("../utils/errors");
const { nextTick } = require("process");



///////////////// CREATE USER ///////////////////////

async function createUser(req, res,next) {
    const { name, email, age } = req.body;

    try {
        if (!name || !email || !age) {
            throw new BadRequest("Missing required field!")
        } else {
            const user1 = await userModel.create({
                //aqui coges los valores del input (html) extraidos de lo que insertas en la pagina
                //es la parte del user_name, user_email etc lo que tiene que coincidir con el html
                name: name,
                email: email,
                age: age

            })
            console.log(user1);
            console.log("User1 is created")
            res.redirect("/");
        }
    }
    catch (error) {
        next(error);
    }
}

////////////////// GET USER ////////////////////////////

async function getUser(req, res) {
    try {
        const users = await userModel.find({});
        if (!users) {
            throw new NotFound("There are no users on the db")
        } else {
            console.log(users);
            res.send(users);
        }
    }
    catch (error) {
        next(error);
    }
    //const users = await userModel.findOne({age: {$gt:30}});

    /* let userDatabaseJSON = fs.readFileSync("./public/storage.json");
     const userJSON=JSON.parse(userDatabaseJSON);
     res.render("user", user=userJSON);*/
}


////////////////// GET USERNAME ///////////////////////////
async function getUserName(req, res) {
    try {
        const user = await userModel.findOne({ name: req.params.name })
        if (!user) {
            throw new NotFound("This name does not match any existing userName")
        } else {
            user.parent = "63bd38ae9388174f2165a904";
            await user.save();
            res.send(user);

        }
    } catch (error) {
        next(error)
    }
    /*
    let userDatabaseJSON= fs.readFileSync("./public/storage.json");
    const userJSON= JSON.parse(userDatabaseJSON);
    const user = _.find(userJSON,["id", req.params.id]);
    res.send(user);*/
}

////////////////////// DELETE USER /////////////////////////

async function deleteUser(req, res) {
    try {
        const user = await userModel.deleteOne({ name: req.params.name });
        if (!user) {
            throw new NotFound("This user does not exist!")
        } else {
            console.log(user);

            res.json({ message: "User deleted!" });
        }
    }
    catch (error) {
        next(error)
        //ADD ERROR HANDLING IN TRY/CATCH!
    }
}

module.exports = { getUser, createUser, getUserName, deleteUser };


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



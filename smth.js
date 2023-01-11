 //Here you write the server
 const express = require("express"); //create the server
 const path = require("path");
 const bodyParser = require("body-parser");
 const static = require("serve-static");
 
 
 const hostname = "localhost";
 const port = 3000;
 
 const app = express();
 const urlencodedParser = bodyParser.urlencoded({ extended: false });
 
 app.use(express.json());
 app.set("view engine", "ejs");
 app.use(express.static(__dirname + '/public'))// para las imagenes
 
 
 
 
 //get main page
 
 app.get("/", (req, res) => {
     res.render('index', { name: "Nath", length: 5,/* ** */ tasks: tasksArray });
     //res.redirect("/tasks");
 
 })
 
     //iterate the array adding elements with updated id
     .post(urlencodedParser, (req, res) => {
         console.log(req.body.newTask);
         let newId = tasksArray.length + 1;
         let newTask = {
             id: newId++,
             text: req.body.newTask,
             completed: false
         }
         tasksArray.push(newTask);
         //res.send(tasksArray);
         res.redirect("/");
     })
         
 
 app.listen({ path: hostname, port: port }, (error) => {
     if (error) console.log("Error");
     else console.log("Server is running on port 3000..");
 
 })
 



 //get login page
app.get("/login", (req, res) => {
    req
    res.sendFile(__dirname + "/login.html");
})

//take the username and the email and display it in console and display received message.

app.post("/login", urlencodedParser, (req, res) => {
    console.log(req.body);
    res.send("Username and Email received!");
})


 //array of objects
let tasksArray = [
    {
        id: 1,
        text: "coding",
        completed: false,

    },
    {

        id: 2,
        text: "cooking",
        completed: true,

    },
    {

        id: 3,
        text: "gaming",
        completed: false

    }

]

//delete task

app.delete("/index.html", (req, res) => {
    res.send("DELETE Request Called")
});


/*
.post((req, res) => {
    app.post("/login", urlencodedParser, (req, res) => {
        let response = {
            username: req.body.user_name,
            email: req.body.user_email
        }
        console.log("Hi!");
        res.end(JSON.stringify(response));
    })

})*/
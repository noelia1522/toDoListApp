//Here you write the server
const express = require("express"); //create the server
const static = require("serve-static");
const taskRoutes = require("./routes/taskRoutes");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");


const hostname = "localhost";
const port = 3000;


//Don't forget to start your DataBase server first!!
//Check the status to make sure the server is running.
const DB_SERVER = "mongodb://127.0.0.1:27017";
const database = "toDoList";
mongoose.set('strictQuery', true);
mongoose.connect(`${DB_SERVER}/${database}`)
    .then(() => { console.log("Connected to database server..."); })
    .catch((err) => { console.log(err); })

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'))// para las imagenes

app.use("/tasks", taskRoutes);
app.use("/user", userRoutes);


//get main page

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.listen({ path: hostname, port: port }, (error) => {
    if (error) console.log("Error");
    else console.log("Server is running on port 3000..");

})

//get login page
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})

//take the username and the email and display it in console and display received message.

app.post("/login", (req, res) => {
    console.log(req.body);
    res.redirect("/tasks");
})

app.get("/user/create", (req,res)=>{
    
})
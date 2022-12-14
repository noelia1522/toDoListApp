//Here you write the server
const express = require("express"); //create the server
const static = require("serve-static");
const taskRoutesdb = require("./routes/taskRoutesdb");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const hostname = "localhost";
const port = process.env.PORT || 3000;


//Don't forget to start your DataBase server first!!
//Check the status to make sure the server is running.
//const DB_SERVER = "mongodb://127.0.0.1:27017";
//const database = "toDoList";
mongoose.set('strictQuery', true);
mongoose.connect(`${process.env.DB_SERVER}`)
    .then(() => { console.log("Connected to database server..."); })
    .catch((err) => { console.log(err); })

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'))// para las imagenes

app.use("/tasks", taskRoutesdb);
app.use("/users", userRoutes);


//get main page

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.listen({ path: hostname, port: port }, (error) => {
    if (error) console.log("Error");
    else console.log(`Server is running on port ${port}..`);

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

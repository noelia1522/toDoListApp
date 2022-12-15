//Here you write the server
const express = require("express"); //create the server
const static = require("serve-static");
const taskRoutes = require("./routes/taskRoutes");


const hostname = "localhost";
const port = 3000;

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'))// para las imagenes

app.use("/tasks", taskRoutes);

//get main page

app.get("/", (req, res) => {
    res.redirect("/tasks");
})
app.listen({ path: hostname, port: port }, (error) => {
    if (error) console.log("Error");
    else console.log("Server is running on port 3000..");

})
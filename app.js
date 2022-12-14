//Here you write the server
const express = require("express"); //create the server
const path = require("path");
const bodyParser = require("body-parser");
const static = require("serve-static");

const hostname = "localhost";
const port = 3000;

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'))// para las imagenes


app.get("/", (req,res)=>{
    res.render('index', {name:"Nath", length:5});

})

app.route("/tasks")

.post(urlencodedParser,(req,res)=>{
    console.log(req.body.newTask);
    let newTask = {
        id:4,
        text: req.body.newTask,
        completed: false
    }
    tasks.push(newTask);
    res.send(tasks)
    //res.redirect("/");
})

//app.get("/", (req, res) => {
 //   res.render("index", { name: "Nath", length: 5 });
//})

app.listen({ path: hostname, port: port }, (error) => {
    if (error) console.log("Error");
    else console.log("Server is running on port 3000..");

})

let user;


let tasks = [ //array of objects
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
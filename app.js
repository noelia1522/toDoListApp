//Here you write the server
const express = require("express"); //create the server
const static = require("serve-static");
const taskRoutesdb = require("./routes/taskRoutesdb");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")
const userRoutes = require("./routes/userRoutes");
const handleError= require("./middleware/handlingErrors");
const flash=require('express-flash');
const session= require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const methodOverride = require ("method-override")


dotenv.config();
const hostname = "localhost";
const port = process.env.PORT || 3001;


const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(methodOverride("_method"))

app.use(session({
    secret: "secret line",
    resave: false,
    saveUninitialized:false ,
    cookie:{maxAge: 24*60*60*1000},
    store: MongoStore.create({
        mongoUrl: process.env.DB_SERVER,
        collection:'sessions'
    })

}
));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Don't forget to start your DataBase server first!!
//Check the status to make sure the server is running.
//const DB_SERVER = "mongodb://127.0.0.1:27017";
//const database = "toDoList";
mongoose.set('strictQuery', true);
mongoose.connect(`${process.env.DB_SERVER}`)
    .then(() => { console.log("Connected to database server..."); })
    .catch((err) => { console.log(err); })
    

//app.use("/", authRoutes);
app.use("/tasks", taskRoutesdb);
app.use("/users", userRoutes);

app.use(handleError);


//get main page

/*app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
*/

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "../views/index.ejs");
})


app.listen({ path: hostname, port: port }, (error) => {
    if (error) console.log("Error");
    else console.log(`Server is running on port ${port}..`);

})

//get login page
app.get("/login", (req, res) => {
    res.render("login");
})

//take the username and the email and display it in console and display received message.

/*app.post("/login", (req, res) => {
    console.log(req.body);
    res.redirect("/tasks");
})*/

app.get('/', function (req, res) {
    req.flash('info', 'Welcome');
    res.render('index', {
      title: 'Home'
    })
  });
app.get('/addFlash',function(req,res){
    req.flash('success', 'Flash message Added');
    res.redirect('/');
})
const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
})

//database connection
require("./models/db");

//express build in module instead of bodyparser
//gather data in console
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//middleware for handlebars files
const static_path = path.join(__dirname, "/views/");
app.set("views" , static_path);
const dir_path = __dirname + "/views/layouts/"
app.engine("hbs" , exphbs({
    extname: "hbs",
    defaultLayout: "MainLayout",
    layoutsDir: dir_path
}));
app.set("view engine" , "hbs");

//js file connection
const ContactController = require("./controllers/ContactController");

//use:middleware function
app.use("/user" , ContactController);

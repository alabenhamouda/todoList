var express = require('express'),
    app     = express(),
    api     = require("./routes/api"),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    Todo    = require('./models/todo');
    methodOverride = require('method-override');

mongoose.connect("mongodb://localhost/todolist");
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use("/api/todos", api);

app.get("/", function(req, res){
    Todo.find()
    .then(function(todos){
        res.render("index", {todos: todos});
    })
})
  
app.listen(3000, function(){
    console.log("Server is running!");
})
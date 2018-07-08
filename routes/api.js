var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');



router.get("/", function(req, res){
    Todo.find()
        .then(function(todos){
            res.json(todos);
        })
})

router.post("/", function(req, res){
    var todo = new Todo({
        name: req.body.name,
        completed: false
    });
    todo.save()
        .then(function(){
            res.json(todo);
        });
});

router.put("/:id", function(req, res){
    Todo.findById(req.params.id)
        .then(function(todo){
            todo.completed = req.body.completed;
            return todo.save()
        })
        .then(function(todo){
            res.json(todo);
        })
        .catch(function(err){
            console.log(err);
        })
});

router.delete("/:id", function(req, res){
    Todo.findByIdAndRemove(req.params.id)
        .then(function(todo){
            res.json(todo);
        })
        .catch(function(err){
            console.log(err);
        })
});

module.exports =  router;
var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    name: String,
    completed: Boolean,
    createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("todo", todoSchema);
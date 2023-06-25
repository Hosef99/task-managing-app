const mongoose = require('mongoose')

let taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("Task", taskSchema)
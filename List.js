const mongoose = require('mongoose')

listSchema = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    content: [{
        name: String,
    }]
}

module.exports = new mongoose.model("List", listSchema)
const mongoose = require('mongoose')

listSchema = {
    name: {
        type: String,
        required: true,
        unique: true
    }
}

module.exports = new mongoose.model("List", listSchema)
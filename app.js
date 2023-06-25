const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const Task = require('./Task')

function getItem(name){
    return Task.find({name: name})
}

const connectionURL = "mongodb://127.0.0.1:27017/taskManagingApp"

mongoose.connect(connectionURL)
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.set("view engine", "ejs")

app.get('/', async function (req, res) {
    res.render('index');
});





app.listen(3000, () => {
    console.log("Server running on port 3000.")
})
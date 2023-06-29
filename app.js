const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const Task = require('./Task')
const List = require('./List')

function getItem(name){
    return Task.find({name: name})
}

function getItemList(listName){
    return Task.find({list: listName})
}

async function addList(listName){
    await List.insertMany({name: listName})
}

const connectionURL = "mongodb://127.0.0.1:27017/taskManagingApp"

mongoose.connect(connectionURL)
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.set("view engine", "ejs")


let currList = "home"

app.get('/', async function (req, res) {
    let listArr = []
    try {
        listArr = await List.find();
        itemArr = await Task.find({name: currList});
    } catch (error) {
        console.log(error)
    }

    console.log(listArr.length)

    res.render('index', {listArray: listArr, itemArray: itemArr, currList: currList});
});

app.get("/list", async function (req, res) {
    console.log(req.body.listName)
    res.redirect("/")
})

app.post("/list", async function (req, res) {
    listName = req.body.listName
    console.log(listName)
    if (listName != ""){
        try {
            await addList(listName)
        } catch (error) {
            console.log(error)
        }
    }
    res.redirect("/")
})



app.listen(3000, () => {
    console.log("Server running on port 3000.")
})
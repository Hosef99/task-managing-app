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

async function addItem(itemName){
    await Task.insertMany({name: itemName, list: currList})
}

const connectionURL = "mongodb://127.0.0.1:27017/taskManagingApp"

mongoose.connect(connectionURL)
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.set("view engine", "ejs")


let currList = "Home"

app.get('/', async function (req, res) {
    let listArr = []
    try {
        listArr = await List.find();
        itemArr = await Task.find({list: currList});
    } catch (error) {
        console.log(error)
    }

    res.render('index', {listArray: listArr, itemArray: itemArr, currList: currList});
});

app.post("/list", async function (req, res) {
    listName = req.body.listName
    if (listName != ""){
        try {
            await addList(listName)
        } catch (error) {
            console.log(error)
        }
    }
    res.redirect("/")
})

app.post("/toList", async function (req, res) {
    let toList = req.body.toList
    currList = toList
    res.redirect("/")
})

app.post("/item", async function (req, res) {
    itemName = req.body.newItem
    try {
        await addItem(itemName)
    } catch (error) {
        console.log(error)
    }
    res.redirect('/')
})

app.post("/deleteItem", async function (req, res) {
    let deleteItem = req.body.delete
    try {
        await Task.deleteOne({name: deleteItem})
    } catch (error) {
        console.log(error)
    }
    res.redirect("/")
})

app.post("/deleteList", async function (req, res) {
    let deleteList = req.body.listName
    if (deleteList != "Home"){
        try {
            await Task.deleteMany({list: deleteList})
            await List.deleteOne({name: deleteList})
        } catch (error) {
            console.log(error)
        }
    }
    
    res.redirect("/")
})


app.listen(3000, () => {
    console.log("Server running on port 3000.")
})
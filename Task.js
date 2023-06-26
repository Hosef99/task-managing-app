const mongoose = require("mongoose");

let taskSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	list: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Task", taskSchema)
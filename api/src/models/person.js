
const mongoose = require("mongoose");

const personSchema = {
    firstname: String,
    lastname: String,
    username: String,
    age: Number,
}

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
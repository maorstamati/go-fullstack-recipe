const mongoose = require('mongoose');

//Define the recipeSchema with all the fields belong to Thing
const recipeSchema = mongoose.Schema({
    title: {type: String, required: true},
    ingredients: {type: String, required: true},
    instructions: {type: String, required: true},
    time: {type: Number, required: true},
    difficulty: {type: Number, required: true},
});

//Export the module in order to be able to import in app. recipeSchema will be enforced.
module.exports = mongoose.model('Recipe', recipeSchema);

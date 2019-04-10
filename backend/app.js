// MONGODB PW: dGS9NtcdO8H6IFVV
// MONGODB CONNECTION: mongodb+srv://Maor:<password>@cluster0-rdaxc.mongodb.net/test?retryWrites=true

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Recipe = require('./models/recipe');

const app = express();

mongoose.connect('mongodb+srv://Test:7teWHbZ1wYRT44AP@cluster0-rdaxc.mongodb.net/test?retryWrites=true').
then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
}).
catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

/*
 CORS stands for Cross Origin Resource Sharing. It is a standard that allows us to relax default security rules
 which prevent HTTP calls from being made between different servers. In our case, we have two origins: localhost:3000
 and localhost:4200, and we would like them to be able to communicate with each other.  For this, we need to add some
 headers to our response object.
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //Any request from any origin is allowed, often the case if we want to build a REST-API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //All these headers are allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //All these types of requests are allowed
    next();
});

app.use(bodyParser.json());

app.post('/api/recipes', (req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        time: req.body.time,
        difficulty: req.body.difficulty
    });
    recipe.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.get('/api/recipes/:id', (req, res, next) => {
    Recipe.findOne({
        _id: req.params.id
    }).then(
        (recipe) => {
            res.status(200).json(recipe);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});

app.put('/api/recipes/:id', (req, res, next) => {
    const recipe = new Recipe({
        _id: req.params.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        time: req.body.time,
        difficulty: req.body.difficulty
    });
    Recipe.updateOne({ _id: req.params.id }, recipe).then(
        (recipe) => {
          console.log(recipe);
            res.status(201).json({
                message: 'Recipe updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.delete('/api/recipes/:id', (req, res, next) => {
  Recipe.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.get('/api/recipes', (req, res, next) => {
    Recipe.find().then(
        (recipes) => {
            res.status(200).json(recipes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});



module.exports = app;

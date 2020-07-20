const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const session = require('express-session')


const PORT = process.env.PORT || 9000;


//Loads the handlebars module

//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    }));


//Serves static files (we need it to imPORT a css file)
app.use(express.static('public'))




//Sets a basic route for homepage
app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('index', {layout : 'main'});
    });

    module.exports = app;

// router


// //Makes the app listen to PORT 9000
// app.listen(PORT, () => console.log(`App listening to PORT ${PORT}`));



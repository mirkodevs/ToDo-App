const express = require('express');
const { dirname, join } = require('path');
const { engine } = require('express-handlebars');
const DatabaseManager = require('./Backend/database')

const app = express();
const port = 3000;

const db = new DatabaseManager( app )

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", join(__dirname, "Frontend", "views"));

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('main', {layout : 'index'});
});

app.listen(port, () => console.log(`App listening to port ${port}`));
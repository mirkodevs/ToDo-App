const express = require('express');
const { dirname, join } = require('path');
const { engine } = require('express-handlebars');
const DatabaseManager = require('./Backend/database')
const axios = require('axios')

const app = express();
const port = 3000;

const db = new DatabaseManager( app )

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", join(__dirname, "Frontend", "views"));

app.use( express.static(join(__dirname, "Frontend", "public")) );
app.get('/', async (req, res) => {

    const { data } = await axios.get(`http://127.0.0.1:${port}/api/tasks`)

    res.render('main', {
        layout : 'index',
        tasks: data.data
    });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
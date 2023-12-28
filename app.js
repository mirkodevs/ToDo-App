const express = require('express');
const { engine } = require ('express-handlebars');

const app = express();
const port = 3000;


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./Frontend/views");

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('main', {layout : 'index'});
});

app.listen(port, () => console.log(`App listening to port ${port}`));
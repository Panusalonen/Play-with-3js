const express = require('express');
const app = express();
const compression = require('compression');
const ca = require('chalk-animation');


app.use(express.static('public'))
app.use(compression());


app.get('/', (req, res) =>{
       res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080, () =>
   ca.rainbow("I'm here for you, Master"));

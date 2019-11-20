require('./config/config')
const express = require('express');

// Using Node.js `require()`
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse applicaction/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extend: false }));

// parse application/json
app.use(bodyParser.json());

// Rutas
app.use(require('./routes/usuario'));


// Conexión
mongoose.connect('mongodb://localhost:27017/cafe',
    (err, res) => {
        if (err) throw err;
        console.log('Database CONNECTED');
    },
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// Escucha
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
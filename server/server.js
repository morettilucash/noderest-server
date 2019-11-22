require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

// parse applicaction/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extend: false }));

// parse application/json
app.use(bodyParser.json());

// Habilitar carpeta public:
app.use(express.static(path.resolve(__dirname, '../public')));

// Rutas
app.use(require('./routes/index'));


// Conexión
mongoose.connect(process.env.URLDB,
    (err, res) => {
        if (err) throw err;
        console.log('Database CONNECTED');
    },
    {
        createIndexes: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// Escucha
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
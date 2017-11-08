const mongoose = require('mongoose'),
    app = require('./app'),
    config = require('./config');

mongoose.connect(config.db, {
    useMongoClient: true
}, (err, res) => {
    if (err) {
        throw `Ha ocurrido un error al conectar la base de datos ${err}`;
    }
    console.log('La conexion se ha efecturado correctamente');
});

app.listen(config.port, () => {
    console.log(`app listeing in port ${config.port}`);
});
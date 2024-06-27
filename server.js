const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
    origin: "*"
}));

// importar conexión MongoDB
const archivoBD = require('./conexion');

// importar bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true' }));

// importar rutas
const rPagina = require('./rutas/pagina');

app.use('/api/pagina', rPagina);

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3005;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// configurando servidor
app.listen(PORT, (req, res) => {
    console.log(`server running: 3005`);
});

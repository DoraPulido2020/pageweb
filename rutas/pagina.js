const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const schemaPagina = new schema({
    nombre: String,
    apellido: String,
    correo: String,
    direccion: String,
    telefono: String,
});

const ModeloPagina = mongoose.model('paginas', schemaPagina);
module.exports = router;

router.post('/agregarPagina', (req, res) => {
    const nuevaPagina = new ModeloPagina({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
    });

    nuevaPagina.save()
        .then(() => res.send('guardado correctamente'))
        .catch(err => res.status(400).send('Error guardando la página: ' + err));
});

router.get('/obtenerPaginas', async (req, res) => {
    try {
        const doc = await ModeloPagina.find();
        res.send(doc);
    } catch (err) {
        res.status(400).send('Error obteniendo páginas: ' + err);
    }
});
router.post('/obtenerPagina', async (req, res) => {
    try {
        const doc = await ModeloPagina.findOne({correo:req.body.correo});
        res.send(doc);
    } catch (err) {
        res.status(400).send('Error obteniendo página: ' + err);
    }
});

router.put('/actualizarPagina', async (req, res) => {
    try {
        await ModeloPagina.findOneAndUpdate(
            { correo: req.body.correo },
            {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                correo: req.body.correo,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
            }
        );
        res.send('actualizado correctamente');
    } catch (err) {
        res.status(400).send('Error actualizando la página: ' + err);
    }
});

router.delete('/borrarPagina', async (req, res) => {
    try {
        await ModeloPagina.findOneAndDelete({ correo: req.body.correo });
        res.send('Eliminado correctamente');
    } catch (err) {
        res.status(400).send('Error eliminando la página: ' + err);
    }
});





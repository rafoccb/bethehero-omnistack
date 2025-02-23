const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/session', SessionController.create);

routes.post('/ongs', OngController.store);
routes.get('/ongs', OngController.index); 

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.get('/', (req, res) => {
    return res.send('Olá Mundo!');
});

module.exports = routes;

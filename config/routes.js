const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/api/v1/cars');
apiRouter.post('/api/v1/cars');
apiRouter.put('/api/v1/cars/:id');
apiRouter.get('/api/v1/cars/:id');
apiRouter.delete('/api/v1/cars/:id');


module.exports = apiRouter;


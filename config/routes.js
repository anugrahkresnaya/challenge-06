const express = require('express');
const controllers = require('../app/controllers');
const apiRouter = express.Router();

apiRouter.get(
  '/api/v1/cars',
  controllers.api.v1.car.list
);
apiRouter.post(
  '/api/v1/cars',
  controllers.api.v1.car.create
);
apiRouter.put(
  '/api/v1/cars/:id',
  controllers.api.v1.car.setCar,
  controllers.api.v1.car.update
);
apiRouter.get(
  '/api/v1/cars/:id',
  controllers.api.v1.car.getCar
);
apiRouter.delete(
  '/api/v1/cars/:id',
  controllers.api.v1.car.setCar,
  controllers.api.v1.car.destroy
);

// error handler
apiRouter.get('/api/v1/errors', () => {
  throw new Error(
    "Error ini"
  )
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;


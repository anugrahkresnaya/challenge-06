const express = require('express');
const controllers = require('../app/controllers');
const apiRouter = express.Router();

// cars router
apiRouter.get(
  '/api/v1/cars',
  controllers.api.v1.car.listByTrue
);
apiRouter.post(
  '/api/v1/cars',
  controllers.api.v1.auth.authorize,
  controllers.api.v1.car.create
);
apiRouter.put(
  '/api/v1/cars/:id',
  controllers.api.v1.auth.authorize,
  controllers.api.v1.car.setCar,
  controllers.api.v1.car.update
);
apiRouter.get(
  '/api/v1/cars/:id',
  controllers.api.v1.auth.authorize,
  controllers.api.v1.car.getCar
);
apiRouter.delete(
  '/api/v1/cars/:id',
  controllers.api.v1.auth.authorize,
  controllers.api.v1.car.setCar,
  controllers.api.v1.car.destroy
);

// users router
apiRouter.get(
  '/api/v1/users',
  controllers.api.v1.auth.authorize,
  controllers.api.v1.user.list
);
apiRouter.delete(
  '/api/v1/users/:id',
  controllers.api.v1.auth.authorize,
  controllers.api.v1.user.setUser,
  controllers.api.v1.user.destroy
);

// user auth
apiRouter.post(
  '/api/v1/register',
  controllers.api.v1.auth.authorize,
  controllers.api.v1.auth.register
);
apiRouter.post(
  '/api/v1/register-admin',
  controllers.api.v1.auth.authorize,
  controllers.api.v1.auth.registerAdmin
);
apiRouter.post(
  '/api/v1/register-member',
  controllers.api.v1.auth.authorize,
  controllers.api.v1.auth.registerMember
);

apiRouter.post(
  '/api/v1/login',
  controllers.api.v1.auth.login
);
apiRouter.get(
  '/api/v1/currentUser',
  controllers.api.v1.auth.authorize,
  controllers.api.v1.auth.currentUser
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


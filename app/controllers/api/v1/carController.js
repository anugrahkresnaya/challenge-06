const carService = require('../../../services/carService');

module.exports = {
  list(req, res) {
    carService
      .list()
      .then(cars => {
        res.status(200).json({
          status: "OK",
          cars
        })
      })
      .catch(err => {
        res.status(400).json({
          status: "FAIL",
          message: err.message
        })
      })
  },

  create(req, res) {
    const body = req.body;

    carService
      .create(body)
      .then(car => {
        res.status(201).json({
          status: "created",
          car
        })
      })
      .catch(err => {
        res.status(201).json({
          status: "FAIL",
          message: err.message
        })
      })
  },

  update(req, res) {
    const id = req.params.id;
    const body = req.body

    carService
      .update(body, id)
      .then(() => {
        res.status(200).json({
          status: "OK",
          car
        })
      })
      .catch(err => {
        res.status(422).json({
          status: "FAIL",
          message: err.message
        })
      })
  },

  destroy(req, res) {
    const id = req.params.id;

    carService
      .delete(id)
      .then(() => {
        res.status(204).end()
      })
      .catch(err => {
        res.status(422).json({
          status: "FAIL",
          message: err.message
        })
      })
  },

  getCar(req, res) {
    carService
      .getById({
        where: { id: req.params.id }
      })
      .then(car => {
        res.status(200).json(car)
      })
      .catch(err => {
        res.status(404).json({
          status: "FAIL",
          message: err.message
        })
      })
  },

  setCar(req, res, next) {
    carService
      .getById({
        where: { id: req.params.id }
      })
      .then(car => {
        if (!car) {
          res.status(404).json({
            status: "FAIL",
            message: "cant find the car"
          })

          return;
        }

        req.car = car;
        next();
      })
      .catch(err => {
        res.status(404).json({
          status: "FAIL",
          message: "cant find the car"
        })
      })
  }
};

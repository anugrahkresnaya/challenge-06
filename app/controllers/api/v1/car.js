const { Cars } = require('../../../models');

module.exports = {
  list(req, res) {
    Cars.findAll()
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
    Cars.create(body)
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
    const car = req.car;
    const body = req.body

    car.update(body)
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
    const car = req.car;

    car.destroy()
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
    Cars.findOne({
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
    Cars.findOne({
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

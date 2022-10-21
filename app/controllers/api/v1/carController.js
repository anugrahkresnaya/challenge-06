const carService = require('../../../services/carService');

module.exports = {
  list(req, res) {
    carService
      .list()
      .then(cars => {
        res.status(200).json({
          status: "OK",
          data: cars
        })
      })
      .catch(err => {
        res.status(400).json({
          status: "FAIL",
          message: err.message
        })
      })
  },

  listByTrue(req, res) {
    carService
      .listByTrue()
      .then(cars => {
        res.status(200).json({
          status: "OK",
          data: cars
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
    const isMember = req.user.role;

    if (isMember === "member") {
      res.status(401).json({
        message: "This user doesn't has access to create car data"
      })
      return
    };

    const body = {
      ...req.body,
      createdBy: req.user.id,
      dataAvailable: true
    };

    carService
      .create(body)
      .then(car => {
        res.status(201).json({
          status: "created",
          data: car
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

    const isMember = req.user.role;

    if (isMember === "member") {
      res.status(401).json({
        message: "This user doesn't has access to update car data"
      })
      return
    };

    const body = {
      ...req.body,
      updatedBy: req.user.id,
    };

    carService
      .update(body, id)
      .then(car => {
        res.status(200).json({
          status: "OK",
          data: car
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

    const isMember = req.user.role;

    if (isMember === "member") {
      res.status(401).json({
        message: "This user doesn't has access to delete car data"
      })
      return
    };

    const payload = {
      deletedBy: req.user.id,
      dataAvailable: false
    };

    carService
      .delete(id, payload)
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

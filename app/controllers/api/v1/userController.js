const user = require('../../../models/user');
const userService = require('../../../services/userService');

module.exports = {
  list(req, res) {
    userService
      .list()
      .then(({ users, userCount }) => {
        res.status(200).json({
          status: "OK",
          data: { users: users },
          meta: { total: userCount }
        });
      })
      .catch(err => {
        res.status(400).json({
          status: "FAIL",
          message: err.message
        });
      });
  },

  create(req, res) {
    userService
      .create(req.body)
      .then(user => {
        res.status(201).json({
          status: "OK",
          user
        });
      })
      .catch(err => {
        res.status(422).json({
          status: "FAIL",
          message: err.message
        })
      });
  },

  update(req, res) {
    userService
      .update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch(err => {
        res.status(422).json({
          status: "FAIL",
          message: err.message
        });
      });
  },

  destroy(req, res) {
    userService
      .delete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(err => {
        res.status(422).json({
          status: "FAIL",
          message: err.message
        });
      })
  },

  getUser(req, res) {
    userService
      .getUserById({
        where: { id: req.params.id }
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(404).json({
          status: "FAIL",
          message: err.message
        });
      });
  },

  setUser(req, res, next) {
    userService
      .getUserById({
        where: { id: req.params.id }
      })
      .then(user => {
        if (!user) {
          res.status(404).json({
            status: "FAIL",
            message: "cant find user"
          })

          return;
        }

        req.user = user;
        next();
      })
      .catch(err => {
        res.status(404).json({
          status: "FAIL",
          message: "cant find user"
        });
      });
  }
}

const bcrypt = require('bcryptjs');
const authService = require('../../../services/authService');

module.exports = {
  register(req, res) {
    const { email, password } = req.body;

    authService
      .register(email, password)
      .then(user => {
        res.status(201).json({
          status: "OK",
          data: user
        });
      })
      .catch(err => {
        res.status(400).json({
          status: "FAIL",
          message: err.message
        });
      });
  },

  login(req, res) {
    const { email, password } = req.body;

    authService
      .login(email, password)
      .then(auth => {
        if (!auth) {
          res.status(401).json({
            status: "FAIL",
            message: "email or password is incorrect"
          });

          return;
        }

        res.status(200).json({
          status: "OK",
          auth
        })
      })
      .catch(err => {
        res.status(400).json({
          status: "FAIL",
          message: err.message
        });
      });
  }
};

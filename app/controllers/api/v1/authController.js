const bcrypt = require('bcryptjs');
const authService = require('../../../services/authService');

module.exports = {
  register(req, res) {
    const { email, password, role } = req.body;

    authService
      .register(email, password, role)
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

  registerAdmin(req, res) {
    const { email, password, role } = req.body;

    const isSuperAdmin = req.user.role;

    if (isSuperAdmin !== "super admin") {
      res.status(401).json({
        status: "FAIL",
        message: "Unauthorized because only super admin can add admin"
      })
      return;
    }
    authService
      .registerAdmin(email, password, role)
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

  registerMember(req, res) {
    const { email, password, role } = req.body;
    const isMember = req.user.role

    if (isMember === "member") {
      res.status(401).json({
        status: "FAIL",
        message: "Unauthorized because only super admin and admin can add member"
      })
      return;
    }
    authService
      .registerMember(email, password, role)
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
  },

  authorize(req, res, next) {
    const Bearer = req.headers.authorization;
    if (!Bearer) {
      res.status(403).json({
        message: "Unauthorized"
      })
      return;
    }

    const token = Bearer.split('Bearer ')[1];

    authService
      .authorize(token)
      .then(user => {
        if (!user) {
          res.status(403).json({
            message: "Unauthorized"
          });
        }

        req.user = user;
        next();
      })
      .catch(err => {
        res.status(403).json({
          message: "Unauthorized"
        })
      });
  },

  currentUser(req, res) {
    const user = req.user;

    res.status(201).json({
      status: "OK",
      data: user
    });
  }
};

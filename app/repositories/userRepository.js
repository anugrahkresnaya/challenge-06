const { User } = require('../models');

module.exports = {
  findUsers() {
    return User.findAll();
  },

  create(body) {
    return User.create(body);
  },

  update(body, id) {
    return User.update(body, {
      where: { id }
    });
  },

  delete(id) {
    return User.destroy({
      where: { id }
    });
  },

  getById(id) {
    return User.findOne(id);
  },

  getTotalUser() {
    return User.count();
  }
}

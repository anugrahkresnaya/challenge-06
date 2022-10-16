const userRepository = require('../repositories/userRepository');

module.exports = {
  async list() {
    try {
      const users = await userRepository.findUsers();
      const userCount = await userRepository.getTotalUser();

      return {
        users,
        userCount
      };
    } catch (err) {
      throw err;
    }
  },

  create(reqBody) {
    return userRepository.create(reqBody);
  },

  update(id, reqBody) {
    return userRepository.update(id, reqBody);
  },

  delete(id) {
    return userRepository.delete(id);
  },

  getUserById(id) {
    return userRepository.getById(id);
  },
};

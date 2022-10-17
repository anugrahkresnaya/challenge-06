const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/authRepository');
const jwt = require('jsonwebtoken');

async function encryptPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    console.log(err);
  }
}

async function comparePassword(password, encryptedPassword) {
  try {
    const isValid = await bcrypt.compare(password, encryptedPassword);
    return isValid;
  } catch (err) {
    console.log(err);
  }
}

function createToken(payload) {
  return jwt.sign(payload, 'secretKey');
}

module.exports = {
  async register(email, password) {
    try {
      const encryptedPassword = await encryptPassword(password);
      const body = {
        email,
        password: encryptedPassword
      }
      const user = await userRepository.create(body);

      return user;
    } catch (err) {
      throw err;
    }
  },

  async login(email, password) {
    try {
      const user = await userRepository.findUser({ email });

      if (!user) {
        return false;
      }

      const { password: encryptedPassword } = user;

      const isAuthenticated = await comparePassword(password, encryptedPassword);

      if (!isAuthenticated) {
        return false;
      }

      // generate token

      const token = createToken({
        id: user.id,
        email: user.email,
      })

      const data = {
        ...user.dataValues,
        token
      }

      return data;
    } catch (err) {
      throw err;
    };
  },
}

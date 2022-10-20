const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/authRepository');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');

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

const SECRET_KEY = 'secretKey'

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  async register(email, password, role) {
    try {
      const encryptedPassword = await encryptPassword(password);
      const body = {
        email,
        password: encryptedPassword,
        role
      }
      const user = await userRepository.create(body);

      return user;
    } catch (err) {
      throw err;
    }
  },

  async registerMember(email, password, role) {
    try {
      const encryptedPassword = await encryptPassword(password);

      const body = {
        email,
        password: encryptedPassword,
        role: "member"
      }
      const user = await userRepository.create(body);

      return user;
    } catch (err) {
      throw err;
    }
  },

  async registerAdmin(email, password, role) {
    try {
      const encryptedPassword = await encryptPassword(password);

      const body = {
        email,
        password: encryptedPassword,
        role: "admin"
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
        role: user.role,
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

  async authorize(token) {
    try {
      const payload = verifyToken(token);

      const id = payload?.id;

      const user = await authRepository.findUserByPk(id);

      return user;
    } catch (err) {
      throw err;
    }
  }
}

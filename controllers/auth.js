const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SIGNATURE_KEY } = process.env;

module.exports = {
  create: async (req, res, next) => {
    try {
      const { email, username, password } = req.body;

      const found = await User.findOne({ where: { email } });
      if (found) {
        return res.status(400).json({
          status: false,
          message: "Email Already Used",
          data: null,
        });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);

      const created = await User.create({
        email,
        username,
        password: encryptedPassword,
      });
      return res.status(201).json({
        status: true,
        message: "Account Created",
        data: {
          email: created.email,
          username: created.username,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Login Error",
          data: null,
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({
          status: false,
          message: "Login Error",
          data: null,
        });
      }

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      const token = jwt.sign(payload, JWT_SIGNATURE_KEY);

      return res.status(200).json({
        status: true,
        message: "Success Login",
        data: { token },
      });
    } catch (err) {
      next(err);
    }
  },
};

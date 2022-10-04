const { User_history } = require("../models");
module.exports = {
  create: async (req, res, next) => {
    try {
      const user = req.user;
      const { score } = req.body;
      const created = await User_history.findOne({
        where: { username: user.username },
      });
      const create = await User_history.create({
        username: user.username,
        score,
        user_id: user.id,
      });
      return res.status(201).json({
        status: true,
        message: "Score Saved",
        data: create,
      });
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      const findAll = await User_history.findAll();
      return res.status(200).json({
        status: true,
        message: "Success Get All Data",
        data: findAll,
      });
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      const { id } = req.params;

      const found = await User_history.findAll({ where: { user_id: id } });
      if (!found) {
        return res.status(200).json({
          status: true,
          message: "Data Not Exist",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Success Get Data",
        data: found,
      });
    } catch (error) {
      next(error);
    }
  },
};

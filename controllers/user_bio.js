const { User_bio } = require("../models");
module.exports = {
  create: async (req, res, next) => {
    try {
      const user = req.user;
      const { bio } = req.body;
      const created = await User_bio.findOne({
        where: { username: user.username },
      });

      if (created) {
        return res.status(400).json({
          status: false,
          message: "You've Already Created a Bio",
          data: null,
        });
      }
      const create = await User_bio.create({
        username: user.username,
        bio,
        user_id: user.id,
      });
      return res.status(201).json({
        status: true,
        message: "Bio Created",
        data: create,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const user = req.user;
      const created = await User_bio.findOne({
        where: { username: user.username },
      });
      if (!created) {
        return res.status(400).json({
          status: false,
          message: "You've Haven't Created Bio Yet",
          data: null,
        });
      }

      const updated = await User_bio.update(
        {
          bio: req.body.bio,
        },
        {
          where: {
            username: user.username,
          },
        }
      );

      const updateSuccess = await User_bio.findOne({
        where: { username: user.username },
      });

      return res.status(200).json({
        status: true,
        message: "Bio Updated",
        data: {
          username: updateSuccess.username,
          bio: updateSuccess.bio,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      const findAll = await User_bio.findAll();
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

      const found = await User_bio.findOne({ where: { id: id } });
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
  delete: async (req, res, next) => {
    try {
      const user = req.user;

      const deleted = await User_bio.destroy({ where: { user_id: user.id } });

      return res.status(200).json({
        status: true,
        message: "Success Delete Data",
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  },
};

"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async create(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);

      const { id, name, email } = newUser;
      return res.json({ id, name, email });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async getAll(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(users);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const user = await _User2.default.findByPk(id);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found.'],
        });
      }

      const { name, email } = user;
      return res.json({ id, name, email });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({
          errors: ['Id invalid.'],
        });
      }

      const user = await _User2.default.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found.'],
        });
      }

      const userUpdated = await user.update(req.body);
      const { id, name, email } = userUpdated;
      return res.json({ id, name, email });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({
          errors: ['Id invalid.'],
        });
      }

      const user = await _User2.default.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found.'],
        });
      }

      await user.destroy();
      return res.json({ deleted: true });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new UserController();

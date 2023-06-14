"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Picture = require('../models/Picture'); var _Picture2 = _interopRequireDefault(_Picture);

class StudentController {
  async getAll(req, res) {
    try {
      const students = await _Student2.default.findAll({
        order: [['id', 'DESC'], [_Picture2.default, 'id', 'DESC']],
        include: {
          model: _Picture2.default,
          attributes: ['id', 'url', 'filename'],
        },
      });

      res.json(students);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: ['Internal server error'],
      });
    }
  }

  async create(req, res) {
    try {
      const student = await _Student2.default.create(req.body);
      return res.json(student);
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
      if (!id) {
        return res.status(400).json({
          errors: ['Id invalid.'],
        });
      }

      const student = await _Student2.default.findByPk(id, {
        order: [['id', 'DESC'], [_Picture2.default, 'id', 'DESC']],
        include: {
          model: _Picture2.default,
          attributes: ['id', 'url', 'filename'],
        },
      });
      if (!student) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }

      return res.json(student);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Id invalid.'],
        });
      }

      const student = await _Student2.default.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }

      const studentUpdated = await student.update(req.body);
      return res.json(studentUpdated);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Id invalid.'],
        });
      }

      const student = await _Student2.default.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }

      student.destroy();
      return res.json({
        deleted: true,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new StudentController();

import Student from "../models/Student";
import Picture from "../models/Picture";

class StudentController {
  async getAll(req, res) {
    try {
      const students = await Student.findAll({
        order: [
          ["id", "DESC"],
          [Picture, "id", "DESC"],
        ],
        include: {
          model: Picture,
          attributes: ["id", "url", "filename"],
        },
      });

      res.json(students);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: ["Internal server error"],
      });
    }
  }

  async create(req, res) {
    try {
      const student = await Student.create(req.body);
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
          errors: ["Id invalid."],
        });
      }

      const student = await Student.findByPk(id, {
        order: [
          ["id", "DESC"],
          [Picture, "id", "DESC"],
        ],
        include: {
          model: Picture,
          attributes: ["id", "url", "filename"],
        },
      });
      if (!student) {
        return res.status(400).json({
          errors: ["Student not found."],
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
          errors: ["Id invalid."],
        });
      }

      const student = await Student.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ["Student not found."],
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
          errors: ["Id invalid."],
        });
      }

      const student = await Student.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ["Student not found."],
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

export default new StudentController();

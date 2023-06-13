import Student from '../models/Student';

class StudentController {
  async getAll(req, res) {
    const students = await Student.findAll();
    res.json(students);
  }

  async create(req, res) {
    try {
      const student = await Student.create(req.body);

      return res.json(student);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      if(!id) {
        return res.status(400).json({
          errors: [ 'Id invalid.' ]
        });
      }

      const student = await Student.findByPk(id);
      if(!student) {
        return res.status(400).json({
          errors: [ 'Student not found.' ]
        });
      }

      return res.json(student);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if(!id) {
        return res.status(400).json({
          errors: [ 'Id invalid.' ]
        });
      }

      const student = await Student.findByPk(id);
      if(!student) {
        return res.status(400).json({
          errors: [ 'Student not found.' ]
        });
      }

      const studentUpdated = await student.update(req.body);
      return res.json(studentUpdated);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if(!id) {
        return res.status(400).json({
          errors: [ 'Id invalid.' ]
        });
      }

      const student = await Student.findByPk(id);
      if(!student) {
        return res.status(400).json({
          errors: [ 'Student not found.' ]
        });
      }

      student.destroy();
      return res.json({
        deleted: true
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }
}

export default new StudentController();

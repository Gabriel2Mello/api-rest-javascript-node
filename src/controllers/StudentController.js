import Student from '../models/Student';

class StudentController {
  async getAll(req, res) {
    const students = await Student.findAll();
    res.json(students);
  }
}

export default new StudentController();

import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async getAll(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if(!user) {
        return res.status(400).json({
          errors: [ 'User not found.' ]
        });
      }

      const { name, email } = user;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async update(req, res) {
    try {
      if(!req.userId) {
        return res.status(400).json({
          errors: [ 'Id invalid.' ]
        });
      }

      const user = await User.findByPk(req.userId);
      if(!user) {
        return res.status(400).json({
          errors: [ 'User not found.' ]
        });
      }

      const userUpdated = await user.update(req.body);
      const { id, name, email } = userUpdated;
      return res.json({ id, name, email });
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  }

  async delete(req, res) {
    try {
      if(!req.userId) {
        return res.status(400).json({
          errors: [ 'Id invalid.' ]
        });
      }

      const user = await User.findByPk(req.userId);
      if(!user) {
        return res.status(400).json({
          errors: [ 'User not found.' ]
        });
      }

      await user.destroy();
      return res.json({ deleted: true });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }
}

export default new UserController();

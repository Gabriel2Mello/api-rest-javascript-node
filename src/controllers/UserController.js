import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async getAll(req, res) {
    try {
      const users = await User.findAll();
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
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(401).json({
          errors: [ 'Id invalid.' ]
        });
      }

      const user = await User.findByPk(id);
      if(!user) {
        return res.status(401).json({
          errors: [ 'User not found.' ]
        });
      }

      const userUpdated = await user.update(req.body);

      return res.json(userUpdated);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(401).json({
          errors: [ 'Id invalid.' ]
        });
      }

      const user = await User.findByPk(id);
      if(!user) {
        return res.status(401).json({
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

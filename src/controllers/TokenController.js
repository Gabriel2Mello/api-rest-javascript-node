import jwt from "jsonwebtoken";
import User from "../models/User";

class TokenController {
  async store(req, res) {
    try {
      const { email = "", password = "" } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          errors: ["Bad request."],
        });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({
          errors: ["User not found."],
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(400).json({
          errors: ["Invalid password."],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_LIFETIME,
      });

      return res.json({ token, user: { nome: user.nome, id, email } });
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }
}

export default new TokenController();

import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 60],
            msg: 'Name need to have between 3 and 60 characters.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email invalid.',
          },
        },
      },
      passwordHash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Password need to have between 6 and 50 characters.',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (!user.password) return;
      user.passwordHash = await bcryptjs.hash(user.password, 8);
    });

    return this;
  }

  async passwordIsValid(password) {
    return bcryptjs.compare(password, this.passwordHash);
  }
}

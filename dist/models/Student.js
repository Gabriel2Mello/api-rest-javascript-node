"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var _sequelize = require("sequelize");
var _sequelize2 = _interopRequireDefault(_sequelize);

class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 60],
              msg: "Name need to have between 3 and 60 characters.",
            },
          },
        },
        lastName: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 60],
              msg: "Name need to have between 3 and 60 characters.",
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          unique: {
            msg: "Email already exists.",
          },
          validate: {
            isEmail: {
              msg: "Email invalid.",
            },
          },
        },
        age: {
          type: _sequelize2.default.INTEGER,
          defaultValue: "",
          validate: {
            isInt: {
              msg: "Age must be an integer number.",
            },
          },
        },
        weight: {
          type: _sequelize2.default.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "Weight must be an integer or float number.",
            },
          },
        },
        height: {
          type: _sequelize2.default.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "Weight must be an integer or float number.",
            },
          },
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Picture, { foreignKey: "studentId" });
  }
}
exports.default = Student;

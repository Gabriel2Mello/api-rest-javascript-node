"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _Picture = require('../models/Picture'); var _Picture2 = _interopRequireDefault(_Picture);

const upload = _multer2.default.call(void 0, _multer4.default).single('picture');

class PictureController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err instanceof _multer2.default.MulterError) {
        console.log(err.code);
        return res.status(400).json({
          errors: [err.code],
        });
      }

      if (err) {
        console.log(err);
        return res.status(400).json({
          errors: [err],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { studentId } = req.body;
        const picture = await _Picture2.default.create({ originalname, filename, studentId });

        return res.json(picture);
      } catch (e) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }
    });
  }
}

exports. default = new PictureController();

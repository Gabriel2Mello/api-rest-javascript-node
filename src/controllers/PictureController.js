import multer from 'multer';
import multerConfig from '../config/multer';

import Picture from '../models/Picture';

const upload = multer(multerConfig).single('picture');

class PictureController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
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
        const picture = await Picture.create({ originalname, filename, studentId });

        return res.json(picture);
      } catch (e) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }
    });
  }
}

export default new PictureController();

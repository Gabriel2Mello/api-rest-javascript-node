import multer from 'multer';

import multerConfig from '../config/multer';

const upload = multer(multerConfig).single('picture');

class PictureController {
  async store(req, res) {
    return upload(req, res, (err) => {
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

      return res.json(req.file);
    });
  }
}

export default new PictureController();

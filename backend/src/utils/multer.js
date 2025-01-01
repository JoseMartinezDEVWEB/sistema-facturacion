import multer from 'multer';
import AppError from './appError.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('No es una imagen! Por favor sube solo imágenes.', 400), false);
  } 
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  },
  fileFilter: fileFilter
});
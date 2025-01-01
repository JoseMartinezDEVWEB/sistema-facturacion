import express from 'express';
import * as productController from '../controllers/productController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Routes only accessible by admin and manager
router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    restrictTo('admin', 'manager'),
    upload.single('image'),
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    restrictTo('admin', 'manager'),
    upload.single('image'),
    productController.updateProduct
  )
  .delete(
    restrictTo('admin', 'manager'),
    productController.deleteProduct
  );

export default router;
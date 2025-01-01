import Product from '../models/Product.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const createProduct = catchAsync(async (req, res) => {
  // Validar que el precio de venta sea mayor al precio de fabricante
  const { manufacturerPrice, salePrice } = req.body;
  
  if (salePrice <= manufacturerPrice) {
    throw new AppError('El precio de venta debe ser mayor al precio de fabricante', 400);
  }

  const productData = { 
    ...req.body, 
    createdBy: req.user.id,
    profit: salePrice - manufacturerPrice,
    profitPercentage: ((salePrice - manufacturerPrice) / manufacturerPrice * 100).toFixed(2)
  };
  
  if (req.file) {
    const result = await uploadImage(req.file.path);
    productData.image = {
      public_id: result.public_id,
      url: result.secure_url
    };
  }

  const product = await Product.create(productData);
  
  res.status(201).json({
    status: 'success',
    data: {
      product
    }
  });
});

export const updateProduct = catchAsync(async (req, res) => {
  // Validar precios si se están actualizando
  if (req.body.manufacturerPrice || req.body.salePrice) {
    const currentProduct = await Product.findById(req.params.id);
    const newManufacturerPrice = req.body.manufacturerPrice || currentProduct.manufacturerPrice;
    const newSalePrice = req.body.salePrice || currentProduct.salePrice;

    if (newSalePrice <= newManufacturerPrice) {
      throw new AppError('El precio de venta debe ser mayor al precio de fabricante', 400);
    }

    req.body.profit = newSalePrice - newManufacturerPrice;
    req.body.profitPercentage = ((req.body.profit / newManufacturerPrice) * 100).toFixed(2);
  }

  const productData = { ...req.body, updatedBy: req.user.id };

  if (req.file) {
    // Delete old image if exists
    if (req.product?.image?.public_id) {
      await deleteImage(req.product.image.public_id);
    }
    
    const result = await uploadImage(req.file.path);
    productData.image = {
      public_id: result.public_id,
      url: result.secure_url
    };
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    productData,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new AppError('Producto no encontrado', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true,
    maxLength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  manufacturerPrice: {
    type: Number,
    required: [true, 'El precio de fabricante es requerido'],
    min: [0, 'El precio de fabricante no puede ser negativo']
  },
  salePrice: {
    type: Number,
    required: [true, 'El precio de venta es requerido'],
    min: [0, 'El precio de venta no puede ser negativo'],
    validate: {
      validator: function(value) {
        // Validar que el precio de venta sea mayor al precio de fabricante
        return value > this.manufacturerPrice;
      },
      message: 'El precio de venta debe ser mayor al precio de fabricante'
    }
  },
  profit: {
    type: Number,
    default: 0
  },
  profitPercentage: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    required: [true, 'La cantidad es requerida'],
    min: [0, 'La cantidad no puede ser negativa']
  },
  measurementType: {
    type: String,
    required: true,
    enum: ['unit', 'weight'],
    default: 'unit'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La categoría es requerida']
  },
  image: {
    public_id: {
      type: String
    },
    url: {
      type: String
    }
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true
  },
  qrCode: {
    type: String,
    unique: true,
    sparse: true
  },
  description: {
    type: String,
    maxLength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Middleware pre-update para calcular ganancia y porcentaje
productSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.manufacturerPrice || update.salePrice) {
      const manufacturerPrice = update.manufacturerPrice || this._update.manufacturerPrice;
      const salePrice = update.salePrice || this._update.salePrice;
      
      update.profit = salePrice - manufacturerPrice;
      update.profitPercentage = ((update.profit / manufacturerPrice) * 100).toFixed(2);
    }
    next();
  });
  
  // Indexes for better query performance
  productSchema.index({ name: 1 });
  productSchema.index({ barcode: 1 });
  productSchema.index({ category: 1 });
  
  const Product = mongoose.model('Product', productSchema);
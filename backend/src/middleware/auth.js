import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) throw new Error();

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Por favor autentíquese.' });
  }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.rol)) {
        return res.status(403).json({
          message: 'No tiene permiso para realizar esta acción'
        });
      }
      next();
    }
  };

  export const protect = catchAsync(async (req, res, next) => {
    // 1) Get token from header
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      throw new AppError('Please log in to access this resource', 401);
    }
  
    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError('The user belonging to this token no longer exists', 401);
    }
  
    // 4) Grant access
    req.user = user;
    next();
  });
  export const restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new AppError('You do not have permission to perform this action', 403);
      }
      next();
    };
  };
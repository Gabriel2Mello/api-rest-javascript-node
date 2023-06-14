import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';

import express from 'express';

import tokenRoutes from './routes/tokenRoutes';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import studentRoutes from './routes/studentRoutes';
import pictureRoutes from './routes/picturesRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/students', studentRoutes);
    this.app.use('/pictures', pictureRoutes);
  }
}

export default new App().app;
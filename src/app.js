// NPM Modules
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

// Local modules
import config from './config/variables.config';
import MySQLStorage from './storage/mysql.storage'; // Updated to use MySQL
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware';
import Api from './api';

const { DISABLE_REQUEST_LOG } = config;

class App {
  /* @constructor
   */
  constructor() {
    this.app = express();
    this.app.use('/upload', express.static('upload'));
  }

  /* @description Initialize the App.
   */
  async init() {
    await App._initializeStorage();
    this._setRequestLogger();
    this._setCors();
    this._setRequestParser();
    this._initializeApi();
    this._setErrorHandler();
  }

  /* @private
   * @description Set request logger.
   */
  _setRequestLogger() {
    if (DISABLE_REQUEST_LOG !== '1') {
      this.app.use(morgan('dev'));
    }
  }

  /* @private
   * @description Set Cross-origin resource sharing.
   */
  _setCors() {
    this.app.use(
      cors({
        origin: process.env.CORS,
        methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
        credentials: true,
        optionsSuccessStatus: 200,
        maxAge: -1
      })
    );
  }

  /* @private
   * @description Set body parser.
   */
  _setRequestParser() {
    this.app.use(bodyParser.json());
    const options = { limit: '500mb', extended: false };
    this.app.use(bodyParser.urlencoded(options));
    this.app.use(express.json());
  }

  /**
   * @private
   * @description Initialize storage.
   */
  static async _initializeStorage() {
    return MySQLStorage.init(); // Updated to use MySQL
  }

  /* @private
   * @description Initialize API.
   */
  _initializeApi() {
    this.app.use('/api/v1', Api);
  }

  /**
   * @private
   * @description General error handler.
   */
  _setErrorHandler() {
    this.app.use(ErrorHandlerMiddleware.init);
  }
}

export default new App();

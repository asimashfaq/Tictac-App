import * as express from 'express';
import * as morgan from 'morgan';
import routes from './routes/routes';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(morgan('dev'));
    applyMiddleware(middleware, this.app);
    applyRoutes(routes, this.app);
    applyMiddleware(errorHandlers, this.app);
  }
}

export default new App().app;

import bodyParser from 'body-parser';
import express from 'express';
import Controller from './interfaces/controller';
import errorMiddleware from './middleware/errorMiddleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './config/swagger.json';
import movieStoreMiddleware from './middleware/movieStoreMiddleware';

class App {
   private readonly app: express.Application;

   constructor(controllers: Controller[]) {
      this.app = express();

      this.initializeMiddlewares();
      this.initializeControllers(controllers);
      this.initializeErrorHandling();
   }

   public listen() {
      this.app.listen(process.env.PORT || 4000, () => {
         console.log(`App listening on the port ${process.env.PORT}`);
      });
   }

   public getServer() {
      return this.app;
   }

   private initializeMiddlewares() {
      this.app.use(bodyParser.json());
   }

   private initializeErrorHandling() {
      this.app.use(errorMiddleware);
   }

   private initializeControllers(controllers: Controller[]) {
      controllers.forEach(controller => {
         this.app.use('/api/v1/', controller.router);
      });
      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
   }
}

export default App;

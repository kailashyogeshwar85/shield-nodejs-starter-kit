import express from 'express';
import appRouter from '../api/routes';
import globalErrorHandlerMiddleware from '../api/middlewares/globalErrorHandler.middleware';
import RequestLogger from '../api/middlewares/reqlogger.middleware';

// eslint-disable-next-line no-undef
const ExpressAppLoader = ({ app, container }: LoaderDependencies): void => {
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
  app.disable('x-powered-by');

  // app.use(corsMiddleware.validateWhitelistDomains());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(RequestLogger.logRequest());

  // scoped container
  // app.use(scopePerRequest(container));

  // Configure routes
  app.use(appRouter(container));
  app.use(globalErrorHandlerMiddleware); // global error handler
};

export default ExpressAppLoader;

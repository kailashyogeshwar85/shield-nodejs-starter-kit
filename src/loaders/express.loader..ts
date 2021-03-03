import bodyParser from 'body-parser';
import appRouter from '../api/routes';

// eslint-disable-next-line no-undef
export default ({ app, container }: LoaderDependencies): void => {
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
  app.disable('x-powered-by');

  // app.use(corsMiddleware.validateWhitelistDomains());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(requestLogger.logRequest());

  // scoped container
  // app.use(scopePerRequest(container));

  // Configure routes
  app.use(appRouter(container));
  // app.use(errorhandlerMiddleware); // global error handler
};

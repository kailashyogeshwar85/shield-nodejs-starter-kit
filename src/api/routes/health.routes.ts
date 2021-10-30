import { Router, Request, Response } from 'express';
import promClient from 'prom-client';
import IRouterDependencies from '../../interfaces/IRouterDepdencies.interface';

const registry = new promClient.Registry();

registry.setDefaultLabels({
  app: 'enigma-app',
});

promClient.collectDefaultMetrics({ register: registry });

const HealthRouter = ({ app }: IRouterDependencies): void => {
  const router = Router();
  app.use(router);
  /**
   *
   * @api {GET} /PING ping
   * @apiName PING
   * @apiGroup Health
   * @apiVersion  0.0.1
   *
   *
   * @apiSuccess (200) {string} PONG
   *
   * @apiSuccessExample {string} Success-Response:
   * PONG
   *
   */
  router.get('/ping', (req: Request, res: Response) => {
    res.send('PONG');
  });

  /**
   *
   * @api {GET} /health ping
   * @apiName healthcheck
   * @apiGroup Health
   * @apiVersion  0.0.1
   *
   *
   * @apiSuccess (200) {string} PONG
   *
   * @apiSuccessExample {string} Success-Response:
   * OK|NOTOK
   *
   */
  router.get('/health', (req: Request, res: Response) => {
    // check for dependent resources eg: db connection
    res.send('OK');
  });

  router.get('/metrics', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', registry.contentType);
    res.end(await registry.metrics());
  });
};

export default HealthRouter;

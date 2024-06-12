import express from 'express';
import cors from 'cors';
import { appConfig } from './2-utils/app-config';
import { employeeController } from './5-controllers/employeesControllers';
import { logsMiddleware } from './6-middleware/logs-Middleware';
import { securityMiddleware } from './6-middleware/security-middleware';
import { errorsMiddleware } from './6-middleware/errors-middleware';
import { productController } from './5-controllers/productController';

// Create main server object:
const server = express();
server.use(cors());
server.use(express.json());
// register log middleware
server.use(logsMiddleware.logRequest);
server.use(securityMiddleware.preventXssAttack);

server.use('/', productController.router);
server.use('/', employeeController.router);

// Register catch all:
server.use(errorsMiddleware.catchAll);

// Run server:
server.listen(appConfig.port, () =>
  console.log('Listening on http://localhost:' + appConfig.port)
);

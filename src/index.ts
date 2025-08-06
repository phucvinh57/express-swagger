import express, { Application } from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import { logger } from '@/utils/logger';

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('docs', swaggerUi.serve, swaggerUi.setup({}))

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
  logger.info(`Health check: http://localhost:${port}/health`);
  logger.info(`Users API: http://localhost:${port}/api/users`);
});

export default app;

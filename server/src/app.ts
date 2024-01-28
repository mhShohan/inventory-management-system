import cors from 'cors';
import express, { Application } from 'express';
import rootRouter from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorhandler';

const app: Application = express();

app.use(express.json());

app.use(cors({ origin: ['https://mhs-inventory.netlify.app'] }));

// application routes
app.use('/api/v1', rootRouter);

app.use(globalErrorHandler);

app.use(notFound);

export default app;

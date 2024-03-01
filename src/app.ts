import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';

import routes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();
// const corsOptions = {
//   origin: true,
//   credentials: true,
// };
// app.use('*', cors(corsOptions));
// app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:3000','https://appliance-repair-frontend-main-rho.vercel.app/'], credentials: true }));


app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});
export default app;

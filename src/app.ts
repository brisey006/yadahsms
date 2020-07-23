import express, { Application, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import fileUpload from 'express-fileupload';

import router from './routes';
import { ResponseError } from './interfaces';
import { actionLogger } from './config/action-logger';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({ 
    secret: process.env.SESSION_KEY as string, 
    resave: true,
    saveUninitialized: true,
}));
app.use(fileUpload());

app.use(express.static(path.join(__dirname, '../public')));
app.use((req: Request, res: Response, next: NextFunction) => {
    app.locals.publicDir = path.join(__dirname, '../public');
    next();
});

mongoose.connect(`mongodb://${process.env.DB_PATH || 'localhost'}:27017/digitaldb1`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('MongoDb started!'));

app.use(actionLogger);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Welcome to Yadah SMS" });
});

app.use('/api', router);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error: ResponseError = new Error(JSON.stringify(['Not Found.']));
    error.status = 404;
    next(error);
});

app.use((error: ResponseError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({ errors: error.message });
});

app.listen(port, () => {
    console.log(`Server started at port ${port}.`);
});
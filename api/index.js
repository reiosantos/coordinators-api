import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import swagger from 'swagger-ui-express';
import env from '../config/environment';
import swaggerDocument from '../swagger';
import routes from './routes';

dotenv.config();

const app = express();

if (env.NODE_ENV === 'production') {
	// noinspection JSUnusedGlobalSymbols
	app.use(morgan('common', {
		skip: (req, res) => res.statusCode < 400,
		stream: `${__dirname}/../morgan.log`
	}));
} else {
	app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1/docs', swagger.serve, swagger.setup(swaggerDocument));
app.use(expressValidator());

routes(app);

app.use((req, res) => res.status(404)
	.json({
		message: 'Not Found. Use /api/v1 to access the api.'
	}));

require('./helpers/passport');

export default app;

import { login, signup } from '../actions/auth';
import ValidatorMiddleware from '../middlewares/validatorMiddleware';
import auth from './auth';
import constituencyRouter from './constituencies';
import parishRouter from './parishes';
import representativeRouter from './representatives';
import subCountyRouter from './subCounties';
import villageRouter from './villages';

const apiPrefix = '/api/v1';

const routes = (app) => {
	app.use(`${apiPrefix}/login`, auth.optional, login);
	app.use(`${apiPrefix}/create-account`, auth.optional,
		ValidatorMiddleware.validate('createAccount'),
		ValidatorMiddleware.returnErrors, signup);

	app.use(apiPrefix, auth.required, representativeRouter);
	app.use(apiPrefix, auth.required, constituencyRouter);
	app.use(apiPrefix, auth.required, subCountyRouter);
	app.use(apiPrefix, auth.required, parishRouter);
	app.use(apiPrefix, auth.required, villageRouter);

	app.use((err, req, res, next) => {
		if (err.name === 'UnauthorizedError') {
			res.status(err.status).send({ message: err.message });
			return;
		}
		next();
	});
	return app;
};

export default routes;

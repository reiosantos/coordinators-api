import express from 'express';
import ParishActions from '../actions/parishes';
import AuthAccessMiddleware from '../middlewares/authAccess';
import ValidatorMiddleware from '../middlewares/validatorMiddleware';

const parishRouter = express.Router({});

parishRouter
	.get('/parishes', ParishActions.getAllParishes)
	.get('/parishes/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		ParishActions.getParish)
	.post('/parishes',
		AuthAccessMiddleware.isAdmin,
		ValidatorMiddleware.validate('createParish'),
		ValidatorMiddleware.returnErrors,
		ParishActions.createParish)
	.put('/parishes/:id',
		AuthAccessMiddleware.isAdmin,
		ValidatorMiddleware.validate('updateParish'),
		ValidatorMiddleware.returnErrors,
		ParishActions.updateParish)
	.delete('/parishes/:id',
		AuthAccessMiddleware.isSuperUser,
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		ParishActions.deleteParish);

export default parishRouter;

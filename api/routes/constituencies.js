import express from 'express';
import ConstituencyActions from '../actions/constituencies';
import AuthAccessMiddleware from '../middlewares/authAccess';
import ValidatorMiddleware from '../middlewares/validatorMiddleware';

const constituencyRouter = express.Router({});

constituencyRouter
	.get('/constituencies', ConstituencyActions.getAllConstituencies)
	.get('/constituencies/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		ConstituencyActions.getConstituency)
	.post('/constituencies',
		AuthAccessMiddleware.isAdmin,
		ValidatorMiddleware.validate('createConstituency'),
		ValidatorMiddleware.returnErrors,
		ConstituencyActions.createConstituency)
	.put('/constituencies/:id',
		AuthAccessMiddleware.isAdmin,
		ValidatorMiddleware.validate('updateConstituency'),
		ValidatorMiddleware.returnErrors,
		ConstituencyActions.updateConstituency)
	.delete('/constituencies/:id',
		AuthAccessMiddleware.isSuperUser,
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		ConstituencyActions.deleteConstituency);

export default constituencyRouter;

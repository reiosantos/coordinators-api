import express from 'express';
import SubCountyActions from '../actions/subCounties';
import ValidatorMiddleware from '../middlewares/validatorMiddleware';

const subCountyRouter = express.Router({});

subCountyRouter
	.get('/sub-counties', SubCountyActions.getAllSubCounties)
	.get('/sub-counties/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		SubCountyActions.getSubCounty)
	.post('/sub-counties',
		ValidatorMiddleware.validate('createSubCounty'),
		ValidatorMiddleware.returnErrors,
		SubCountyActions.createSubCounty)
	.put('/sub-counties/:id',
		ValidatorMiddleware.validate('updateSubCounty'),
		ValidatorMiddleware.returnErrors,
		SubCountyActions.updateSubCounty)
	.delete('/sub-counties/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		SubCountyActions.deleteSubCounty);

export default subCountyRouter;

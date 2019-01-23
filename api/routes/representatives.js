import express from 'express';
import RepresentativeActions from '../actions/representatives';
import ValidatorMiddleware from '../middlewares/validatorMiddleware';

const representativeRouter = express.Router({});

representativeRouter
	.get('/representatives', RepresentativeActions.getAllRepresentatives)
	.get('/representatives/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		RepresentativeActions.getRepresentative)
	.post('/representatives',
		ValidatorMiddleware.validate('createRepresentative'),
		ValidatorMiddleware.returnErrors,
		RepresentativeActions.createRepresentative)
	.put('/representatives/:id',
		ValidatorMiddleware.validate('updateRepresentative'),
		ValidatorMiddleware.returnErrors,
		RepresentativeActions.updateRepresentative)
	.delete('/representatives/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		RepresentativeActions.deleteRepresentative);

export default representativeRouter;

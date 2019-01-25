import express from 'express';
import RepresentativeActions from '../actions/representatives';
import AuthAccessMiddleware from '../middlewares/authAccess';
import ValidatorMiddleware from '../middlewares/validatorMiddleware';

const representativeRouter = express.Router({});

representativeRouter
	.get('/representatives', RepresentativeActions.getAllRepresentatives)
	.get('/representatives/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		RepresentativeActions.getRepresentative)
	.post('/representatives',
		AuthAccessMiddleware.isAdmin,
		ValidatorMiddleware.validate('createRepresentative'),
		ValidatorMiddleware.returnErrors,
		RepresentativeActions.createRepresentative)
	.put('/representatives/:id',
		AuthAccessMiddleware.isAdmin,
		ValidatorMiddleware.validate('updateRepresentative'),
		ValidatorMiddleware.returnErrors,
		RepresentativeActions.updateRepresentative)
	.delete('/representatives/:id',
		AuthAccessMiddleware.isSuperUser,
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		RepresentativeActions.deleteRepresentative);

export default representativeRouter;

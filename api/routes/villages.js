import express from 'express';
import VillageActions from '../actions/villages';
import AuthAccessMiddleware from '../middlewares/authAccess';
import ValidatorMiddleware from '../middlewares/validatorMiddleware';

const villageRouter = express.Router({});

villageRouter
	.get('/villages', VillageActions.getAllVillages)
	.get('/villages/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		VillageActions.getVillage)
	.post('/villages',
		AuthAccessMiddleware.isAdmin,
		ValidatorMiddleware.validate('createVillage'),
		ValidatorMiddleware.returnErrors,
		VillageActions.createVillage)
	.put('/villages/:id',
		AuthAccessMiddleware.isAdmin,
		ValidatorMiddleware.validate('updateVillage'),
		ValidatorMiddleware.returnErrors,
		VillageActions.updateVillage)
	.delete('/villages/:id',
		AuthAccessMiddleware.isSuperUser,
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		VillageActions.deleteVillage);

export default villageRouter;

import express from 'express';
import VillageActions from '../actions/villages';
import ValidatorMiddleware from '../middlewares/validatorMiddleware';

const villageRouter = express.Router({});

villageRouter
	.get('/villages', VillageActions.getAllVillages)
	.get('/villages/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		VillageActions.getVillage)
	.post('/villages',
		ValidatorMiddleware.validate('createVillage'),
		ValidatorMiddleware.returnErrors,
		VillageActions.createVillage)
	.put('/villages/:id',
		ValidatorMiddleware.validate('updateVillage'),
		ValidatorMiddleware.returnErrors,
		VillageActions.updateVillage)
	.delete('/villages/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		VillageActions.deleteVillage);

export default villageRouter;

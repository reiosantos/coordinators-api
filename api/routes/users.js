import express from 'express';
import UserActions from '../actions/users';
import ValidatorMiddleware from '../middlewares/validatorMiddleware';

const userRouter = express.Router({});

userRouter
	.get('/users', UserActions.getAllUsers)
	.get('/users/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		UserActions.getUser)
	.post('/users',
		ValidatorMiddleware.validate('createUser'),
		ValidatorMiddleware.returnErrors,
		UserActions.createUser)
	.put('/users/:id',
		ValidatorMiddleware.validate('updateUser'),
		ValidatorMiddleware.returnErrors,
		UserActions.updateUser)
	.delete('/users/:id',
		ValidatorMiddleware.validate('validateUUIDParam'),
		ValidatorMiddleware.returnErrors,
		UserActions.deleteUser);

export default userRouter;

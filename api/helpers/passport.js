import passport from 'passport';
import LocalStrategy from 'passport-local';
import { USER_MODAL } from '../constants';
import { validatePassword } from './auth.helpers';
import DatabaseWrapper from '../models';

passport.use(new LocalStrategy({

	usernameField: 'username',
	passwordField: 'password'

}, async (username, password, next) => {
	const user = await DatabaseWrapper.findOne(
		USER_MODAL, { username }, undefined, undefined, false
	);

	if (!user) {
		return next(null, false, { errors: { user: 'username or password is invalid' } });
	}

	return validatePassword(password, user.password)
		.then((isValid) => {
			if (isValid) {
				return next(null, user);
			}
			return next(null, false, {
				errors: { user: 'username or password is invalid.' }
			});
		})
		.catch(error => next(null, false, { errors: { error } }));
}));

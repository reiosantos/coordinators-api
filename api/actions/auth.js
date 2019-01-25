import passport from 'passport';
import { USER_MODAL } from '../constants';
import { generateJWTToken, hashPassword, toAuthJSON } from '../helpers/auth.helpers';
import DatabaseWrapper from '../models';

/* eslint-disable no-unused-vars */
export const signup = async (req, res) => {
	const { body: user } = req;
	try {
		user.password = await hashPassword(user.password);
		const userData = await DatabaseWrapper.findOne(USER_MODAL, { username: user.username });
		
		if (userData && userData.id ) {
			return res.status(200).json({
				message: 'This username is already taken, please choose a different name'
			});
		}
		const data = await DatabaseWrapper.createOne(USER_MODAL, user);
		return res.status(201).json(data);
	} catch (err) {
		let resp = err;
		if (err.original.errno === 1452) {
			resp = 'This representative does not exists';
		}
		if (err.name === 'SequelizeUniqueConstraintError') {
			resp = 'Sorry, This user already has an account.';
		}
		return res.status(400).json({ error: resp });
	}
};

export const login = (req, res, next) => {
	const { body: user } = req;

	if (!user.username) {
		return res.status(422)
			.json({ errors: { username: 'username is required' } });
	}

	if (!user.password) {
		return res.status(422)
			.json({ errors: { password: 'password is required' } });
	}

	return passport.authenticate('local', { session: false },
		(err, passportUser, info) => {
			if (err) return res.status(400).json({ err });

			const userObject = passportUser;
			if (userObject) {
				userObject.token = generateJWTToken(userObject);
				return res.json({ user: toAuthJSON(userObject) });
			}
			return res.status(400)
				.json(err || info);
		})(req, res, next);
};

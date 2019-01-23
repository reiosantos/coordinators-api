import { toAuthJSON } from './auth.helpers';

class Helpers {
	static getErrorMessage(error) {
		let message = null;
		if (error.code === 11000) {
			message = error.errmsg.includes('contact')
				? 'This phone number has already been used.' : message;

			message = error.errmsg.includes('email')
				? 'This Email has already been taken' : message;
		}
		return message || error;
	}

	static userCallback(error, resUser, res, status = 200, signup = false) {
		if (error) {
			const message = Helpers.getErrorMessage(error);
			return res.status(400).json({ error: message });
		}

		const docs = signup ? toAuthJSON(resUser) : resUser;

		let data = {};
		if (docs) {
			data = !Array.isArray(docs)
				? { user: { ...docs, password: undefined, __v: undefined } }
				: { users: docs };
		}
		return res.status(status).json({ ...data, error });
	}
}

export default Helpers;

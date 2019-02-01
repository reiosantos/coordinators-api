import { REPRESENTATIVE_MODAL, USER_MODAL } from '../constants';
import { toAuthJSON } from './auth.helpers';
import { Sequelize} from 'sequelize';

const Op = Sequelize.Op;

class Helpers {
	static modifyWhereClause(objectModel, where = {}) {
		const obj = {};
		if (objectModel === USER_MODAL) {
			obj.username = { [Op.ne]: 'admin' };
		} else if (objectModel === REPRESENTATIVE_MODAL) {
			obj.firstName = { [Op.ne]: 'admin' };
		} else {
			obj[`${objectModel}Name`] = { [Op.ne]: 'admin' };
		}
		return { ...where, ...obj };
	}
	
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
			return res.status(400).json({ message });
		}

		const docs = signup ? toAuthJSON(resUser) : resUser;

		let data = {};
		if (docs) {
			data = !Array.isArray(docs)
				? { user: { ...docs, password: undefined, __v: undefined } }
				: { users: docs };
		}
		return res.status(status).json({ ...data, message: error });
	}
}

export default Helpers;

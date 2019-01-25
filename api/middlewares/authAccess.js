import jwt from 'jsonwebtoken';
import { USER_MODAL } from '../constants';
import DatabaseWrapper from '../models';
import { getTokenFromHeaders } from '../routes/auth';

class AuthAccessMiddleware {

	static async isSuperUser(req, res, next) {
		const token = getTokenFromHeaders(req, res);
		const tokenData = jwt.decode(token);
		const user = await DatabaseWrapper.findOne(USER_MODAL, tokenData.id);
		
		if (user && user.isSuperUser) return next();
		
		return res.status(403).json({
			message: 'You do not have the required permission to access this page'
		})
	}
	
	static async isAdmin(req, res, next) {
		const token = getTokenFromHeaders(req, res);
		const tokenData = jwt.decode(token);
		const user = await DatabaseWrapper.findOne(USER_MODAL, tokenData.id);
		
		if (user && (user.isAdmin || user.isSuperUser)) return next();
		
		return res.status(403).json({
			message: 'You do not have the required permission to access this page'
		})
	}
}

export default AuthAccessMiddleware;

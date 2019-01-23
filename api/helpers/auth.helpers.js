import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function getUserFullName(user) {
	return `${user.firstName} ${user.lastName}`;
}

export function validatePassword(plain, hashed) {
	return bcrypt.compare(plain, hashed);
}

export async function hashPassword(password) {
	const SALT_WORK_FACTOR = 10;
	const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
	return bcrypt.hash(password, salt);
}

export function generateJWTToken(userObject) {
	const today = new Date();
	const expiry = new Date(today);

	expiry.setDate(today.getDate() + 2);
	return jwt.sign({
		id: userObject.id,
		exp: Number.parseInt(expiry.getTime() / 100, 10)
	}, process.env.JWT_SECRET);
}

export function toAuthJSON(userObject) {
	const { Representative: { dataValues: representative } } = userObject;
	return {
		_id: userObject.id,
		name: getUserFullName(representative),
		token: generateJWTToken(userObject)
	};
}

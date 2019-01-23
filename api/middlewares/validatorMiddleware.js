import { body, param } from 'express-validator/check';
import Utils from '../util';

class ValidatorHelper {
	static validateCreateAccount() {
		return [
			body('username', 'Username is required').exists(),
			body('password', 'Password is required').exists(),
			body('representativeId', 'This is not a valid representative')
				.exists().isUUID()
		];
	}

	static validateCreateRepresentative() {
		return [
			body('firstName', 'First Name is required').exists(),
			body('lastName', 'Last Name is required').exists(),
			body('contact').custom((value) => {
				if (!value
					|| value.match(/[^0-9 \-+\\)(]/)
					|| value.length < 10
					|| value.length > 13
				) {
					throw Error('Please input a valid phone number');
				}
				return value;
			}),
			body('dateOfBirth').custom((value) => {
				if (value.match(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/)) {
					return Utils.formatDateForDatabase(value);
				}
				throw new Error('The birth date is invalid. '
						+ 'It should be in the format `YYY-MM-DD` or `YYY-MM-DD hh:mm:ss`');
			}),
			body('email', 'Email is invalid').optional().isEmail(),
			body('villageId', 'A valid village identifier is required').isUUID()
		];
	}

	static validateCreateConstituency() {
		return [body('constituencyName', 'This field is required').exists()];
	}

	static validateCreateSubCounty() {
		return [
			body('subCountyName', 'This field is required').exists(),
			body('constituencyId', 'This SubCounty must belong to a constituency')
				.exists()
		];
	}

	static validateCreateParish() {
		return [
			body('parishName', 'This field is required').exists(),
			body('subCountyId', 'This Parish must belong to a SubCounty')
				.exists()
		];
	}

	static validateCreateVillage() {
		return [
			body('villageName', 'This field is required').exists(),
			body('parishId', 'This Village must belong to a parish')
				.exists()
		];
	}

	static validateUpdateRepresentative() {
		return [
			param('id', 'The user ID provided is invalid').isUUID(),
			body('firstName').optional(),
			body('lastName').optional(),
			body('contact').optional().custom((value) => {
				if (!value
					|| value.match(/[^0-9 \-+\\)(]/)
					|| value.length < 10
					|| value.length > 13
				) {
					throw Error('Please input a valid phone number');
				}
				return value;
			}),
			body('dateOfBirth').optional().custom((value) => {
				if (value.match(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/)) {
					return Utils.formatDateForDatabase(value);
				}
				throw new Error('The birth date is invalid. '
					+ 'It should be in the format `YYY-MM-DD` or `YYY-MM-DD hh:mm:ss`');
			}),
			body('email').optional().isEmail(),
			body('villageId').optional().isUUID()
		];
	}

	static validateUpdateConstituency() {
		return [
			param('id', 'A valid record Identifier is required').exists().isUUID(),
			body('constituencyName').optional().isString(),
			body('representativeId', 'This representative is not found').optional()
				.isUUID()
		];
	}

	static validateUpdateSubCounty() {
		return [
			param('id', 'A valid record Identifier is required').exists().isUUID(),
			body('subCountyName').optional().isString(),
			body('constituencyId', 'This constituency could not be found').optional()
				.isUUID(),
			body('representativeId', 'This representative is not found').optional()
				.isUUID()
		];
	}

	static validateUpdateParish() {
		return [
			param('id', 'A valid record Identifier is required').exists().isUUID(),
			body('parishName').optional().isString(),
			body('subCountyId', 'This SubCounty could not be found').optional()
				.isUUID(),
			body('representativeId', 'This representative is not found').optional()
				.isUUID()
		];
	}

	static validateUpdateVillage() {
		return [
			param('id', 'A valid record Identifier is required').exists().isUUID(),
			body('villageName').optional().isString(),
			body('parishId', 'This parish could not be found').optional()
				.isUUID(),
			body('representativeId', 'This representative is not found').optional()
				.isUUID()
		];
	}
}

class ValidatorMiddleware {
	static validate(method) {
		switch (method) {
			case 'createAccount':
				return ValidatorHelper.validateCreateAccount();
			case 'createRepresentative':
				return ValidatorHelper.validateCreateRepresentative();
			case 'createConstituency':
				return ValidatorHelper.validateCreateConstituency();
			case 'createSubCounty':
				return ValidatorHelper.validateCreateSubCounty();
			case 'createParish':
				return ValidatorHelper.validateCreateParish();
			case 'createVillage':
				return ValidatorHelper.validateCreateVillage();
			case 'updateRepresentative':
				return ValidatorHelper.validateUpdateRepresentative();
			case 'updateConstituency':
				return ValidatorHelper.validateUpdateConstituency();
			case 'updateSubCounty':
				return ValidatorHelper.validateUpdateSubCounty();
			case 'updateParish':
				return ValidatorHelper.validateUpdateParish();
			case 'updateVillage':
				return ValidatorHelper.validateUpdateVillage();
			case 'validateUUIDParam':
				return [
					param('id', 'The user ID provided is invalid').exists()
						.isUUID()
				];
			default:
				return [];
		}
	}

	static async returnErrors(req, res, next) {
		const errors = await req.getValidationResult();
		if (errors.isEmpty()) {
			return next();
		}
		const responseErrors = errors.array()
			.map(error => ({
				field: error.param,
				message: error.msg
			}));
		return res.status(400)
			.json({ errors: responseErrors });
	}
}

export default ValidatorMiddleware;

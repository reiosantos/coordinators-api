import models from '../../database/models';

const {
	User, Representative, Constituency, SubCounty, Parish, Village
} = models;

class ModelFactory {
	/**
	 * Creates a modal of Type `name`
	 * Returns the modal matching the name or null
	 *
	 * @param name
	 * @returns Sequelize.Sequelize.Model
	 */
	static getModel = (name) => {
		if (!name) return null;
		const modelName = name.toLowerCase();

		if (modelName.match(/^users?$/)) return User;
		if (modelName.match(/^representatives?$/)) return Representative;
		if (modelName.match(/^constituenc(y|ies?)$/)) return Constituency;
		if (modelName.match(/^subcount(y|ies?)$/)) return SubCounty;
		if (modelName.match(/^parish(es)?$/)) return Parish;
		if (modelName.match(/^villages?$/)) return Village;

		return null;
	};
}

export default ModelFactory;

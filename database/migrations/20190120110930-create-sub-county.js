
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('SubCounties', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4
		},
		subCountyName: {
			allowNull: false,
			type: Sequelize.STRING
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE
		}
	}),
	/* eslint-disable no-unused-vars */
	down: (queryInterface, Sequelize) => queryInterface.dropTable('SubCounties')
};

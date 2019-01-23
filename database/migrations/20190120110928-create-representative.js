
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Representatives', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4
		},
		firstName: {
			type: Sequelize.STRING
		},
		lastName: {
			type: Sequelize.STRING
		},
		email: {
			allowNull: true,
			type: Sequelize.STRING
		},
		dateOfBirth: {
			type: Sequelize.DATE
		},
		contact: {
			unique: true,
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable('Representatives')
};

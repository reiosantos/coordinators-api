

module.exports = {
	up: async (queryInterface, Sequelize) => [
		await queryInterface.addColumn('Constituencies', 'representativeId', {
			type: Sequelize.UUID,
			onDelete: 'SET NULL',
			references: {
				model: 'Representatives',
				key: 'id'
			}
		}),
		await queryInterface.addColumn('SubCounties', 'constituencyId', {
			type: Sequelize.UUID,
			onDelete: 'CASCADE',
			references: {
				model: 'Constituencies',
				key: 'id'
			}
		}),
		await queryInterface.addColumn('SubCounties', 'representativeId', {
			type: Sequelize.UUID,
			onDelete: 'SET NULL',
			references: {
				model: 'Representatives',
				key: 'id'
			}
		}),
		await queryInterface.addColumn('Parishes', 'subCountyId', {
			type: Sequelize.UUID,
			onDelete: 'CASCADE',
			references: {
				model: 'SubCounties',
				key: 'id'
			}
		}),
		await queryInterface.addColumn('Parishes', 'representativeId', {
			type: Sequelize.UUID,
			onDelete: 'SET NULL',
			references: {
				model: 'Representatives',
				key: 'id'
			}
		}),
		await queryInterface.addColumn('Villages', 'parishId', {
			type: Sequelize.UUID,
			onDelete: 'CASCADE',
			references: {
				model: 'Parishes',
				key: 'id'
			}
		}),
		await queryInterface.addColumn('Villages', 'representativeId', {
			type: Sequelize.UUID,
			onDelete: 'SET NULL',
			references: {
				model: 'Representatives',
				key: 'id'
			}
		}),
		await queryInterface.addColumn('Representatives', 'villageId', {
			type: Sequelize.UUID,
			onDelete: 'SET NULL',
			references: {
				model: 'Villages',
				key: 'id'
			}
		}),
		await queryInterface.addColumn('Users', 'representativeId', {
			type: Sequelize.UUID,
			onDelete: 'CASCADE',
			unique: true,
			allowNull: false,
			references: {
				model: 'Representatives',
				key: 'id'
			}
		})
	],

	down: async (queryInterface, Sequelize) => [
		await queryInterface.removeColumn('Constituencies', 'representativeId'),
		await queryInterface.removeColumn('SubCounties', 'constituencyId'),
		await queryInterface.removeColumn('SubCounties', 'representativeId'),
		await queryInterface.removeColumn('Parishes', 'subCountyId'),
		await queryInterface.removeColumn('Parishes', 'representativeId'),
		await queryInterface.removeColumn('Villages', 'parishId'),
		await queryInterface.removeColumn('Villages', 'representativeId'),
		await queryInterface.removeColumn('Representatives', 'villageId'),
		await queryInterface.removeColumn('Users', 'representativeId')
	]
};

module.exports = (sequelize, DataTypes) => {
	const Parish = sequelize.define('Parish', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		parishName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {});
	Parish.associate = (models) => {
		// associations can be defined here
		Parish.belongsTo(models.SubCounty, {
			foreignKey: 'subCountyId',
			targetKey: 'id',
			onDelete: 'CASCADE'
		});
		Parish.belongsTo(models.Representative, {
			foreignKey: 'representativeId',
			targetKey: 'id',
			onDelete: 'SET NULL'
		});
		Parish.hasMany(models.Village, {
			foreignKey: 'parishId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		});
	};
	return Parish;
};

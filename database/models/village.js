module.exports = (sequelize, DataTypes) => {
	const Village = sequelize.define('Village', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		villageName: {
			allowNull: false,
			type: DataTypes.STRING
		}
	}, {});
	Village.associate = (models) => {
		// associations can be defined here
		Village.belongsTo(models.Parish, {
			foreignKey: 'parishId',
			targetKey: 'id',
			onDelete: 'CASCADE'
		});
		Village.belongsTo(models.Representative, {
			foreignKey: 'representativeId',
			targetKey: 'id',
			onDelete: 'SET NULL',
			allowNull: true
		});
		Village.hasMany(models.Representative, {
			foreignKey: 'villageId',
			onDelete: 'SET NULL',
			allowNull: true
		});
	};
	return Village;
};

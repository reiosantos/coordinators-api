module.exports = (sequelize, DataTypes) => {
	const Constituency = sequelize.define('Constituency', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		constituencyName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {});
	Constituency.associate = (models) => {
		// associations can be defined here
		Constituency.belongsTo(models.Representative, {
			foreignKey: 'representativeId',
			targetKey: 'id',
			onDelete: 'SET NULL',
			allowNull: true
		});
		Constituency.hasMany(models.SubCounty, {
			foreignKey: 'constituencyId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};
	return Constituency;
};

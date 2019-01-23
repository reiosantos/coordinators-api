module.exports = (sequelize, DataTypes) => {
	const SubCounty = sequelize.define('SubCounty', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		subCountyName: {
			allowNull: false,
			type: DataTypes.STRING
		}
	}, {});
	SubCounty.associate = (models) => {
		// associations can be defined here
		SubCounty.belongsTo(models.Constituency, {
			foreignKey: 'constituencyId',
			targetKey: 'id',
			onDelete: 'CASCADE'
		});
		SubCounty.belongsTo(models.Representative, {
			foreignKey: 'representativeId',
			targetKey: 'id',
			onDelete: 'SET NULL'
		});
		SubCounty.hasMany(models.Parish, {
			foreignKey: 'subCountyId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		});
	};
	return SubCounty;
};

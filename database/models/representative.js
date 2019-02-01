module.exports = (sequelize, DataTypes) => {
	const Representative = sequelize.define('Representative', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: {
			allowNull: true,
			type: DataTypes.STRING
		},
		dateOfBirth: {
			type: DataTypes.DATE,
			defaultValue: sequelize.Date
		},
		contact: {
			unique: true,
			allowNull: false,
			type: DataTypes.STRING
		}
	}, {});
	Representative.associate = (models) => {
		// associations can be defined here
		Representative.hasOne(models.Constituency, {
			foreignKey: 'representativeId',
			onDelete: 'SET NULL'
		});
		Representative.hasOne(models.SubCounty, {
			foreignKey: 'representativeId',
			onDelete: 'SET NULL'
		});
		Representative.hasOne(models.Parish, {
			foreignKey: 'representativeId',
			onDelete: 'SET NULL'
		});
		Representative.hasOne(models.Village, {
			foreignKey: 'representativeId',
			onDelete: 'SET NULL'
		});
		Representative.belongsTo(models.Village, {
			foreignKey: 'villageId',
			targetKey: 'id',
			onDelete: 'SET NULL'
		});
	};
	return Representative;
};

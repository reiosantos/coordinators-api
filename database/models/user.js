module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		}
	}, {});
	User.associate = (models) => {
		// associations can be defined here
		User.belongsTo(models.Representative, {
			foreignKey: 'representativeId',
			targetKey: 'id',
			onDelete: 'CASCADE'
		});
	};
	return User;
};

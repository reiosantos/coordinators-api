module.exports = (sequelize, DataTypes) => {
	return sequelize.define('User', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		username: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		contact: {
			type: DataTypes.STRING
		},
		isSuperUser: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {});
};

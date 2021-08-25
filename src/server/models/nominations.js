module.exports = (sequelize, DataTypes) => {
    const nominations = sequelize.define('nominations', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        useremail: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        nomineeemail: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        nomineeFirstName: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        nomineeLastName: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        nomineename: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        nomineeteam: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        reason: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
		createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true,
        tableName: 'nominations'
    });

    return nominations;
};
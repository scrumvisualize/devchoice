module.exports = (sequelize, DataTypes) => {
    const managenominees = sequelize.define('managenominees', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        access: {
            type: DataTypes.STRING(10),
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
        tableName: 'managenominees'
    });

    return managenominees;
};
module.exports = (sequelize, DataTypes) => {
    const nominationsession = sequelize.define('nominationsession', {
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
        nominationStartDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nominationEndDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
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
        tableName: 'nominationsession'
    });

    nominationsession.associate = function (models) {
        // associations has been defined here
        nominationsession.hasOne(models.nominations, {
            foreignKey: 'session_id',
            targetKey: 'id',
            onDelete: "CASCADE"
        });
    };
    return nominationsession;
};
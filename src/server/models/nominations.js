module.exports = (sequelize, DataTypes) => {
    const nominations = sequelize.define('nominations', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        session_id: {
            type: DataTypes.INTEGER(18)
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

    nominations.associate = function (models) {
        // session_id set as foreignKey in the nominations table -> id of nominationsession table
        nominations.belongsTo(models.nominationsession, {
            foreignKey: 'session_id',
            sourceKey: 'id',
            onDelete: "CASCADE"
        });
    };

    return nominations;
};
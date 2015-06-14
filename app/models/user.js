module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
        UserId: { type: DataTypes.INTEGER, primaryKey: true },
        OpenID: DataTypes.STRING(256)
    }, {
        timestamps: false,
        tableName: 'User'
    });
};

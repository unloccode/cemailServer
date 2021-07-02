module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('userdata', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING
        },
        confirmed: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    });
    return User;
}
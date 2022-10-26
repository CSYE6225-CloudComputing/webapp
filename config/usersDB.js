
module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("userDetails", {
        user_id: {
            type: Sequelize.STRING,
            primaryKey: true,
            foreignKey: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        }
    });



    
    return user;
};
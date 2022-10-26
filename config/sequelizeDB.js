const configDB = require('./configDB.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(configDB.db.database, configDB.db.user, configDB.db.password, {
    host: configDB.db.host,
    dialect: configDB.db.dialect,
    operatorsAliases: 0,
    port: configDB.db.port,
    pool: {
        max: configDB.db.pool.max,
        min: configDB.db.pool.min,
        acquire: configDB.db.pool.acquire,
        idle: configDB.db.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./usersDB')(sequelize, Sequelize);
db.documents = require('./documentsDB')(sequelize, Sequelize);

db.documents.belongsTo(db.users, {foreignKey: 'user_id' });
db.users.belongsTo(db.documents, {foreignKey: 'user_id' });


module.exports = db;
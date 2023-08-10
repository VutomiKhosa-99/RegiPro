const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("sage_cqop", "vutomi", "drOU5lyGCQPL4Y94rZiRRjhsJhT2W70E", {
    host: "dpg-ci3fns3hp8u1a185jqkg-a.oregon-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
  
  // Test the connection
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();
  

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/User.js")(sequelize, Sequelize);
db.role = require("../models/Role.js")(sequelize, Sequelize);
db.response = require("../models/Response.js")(sequelize, Sequelize);

// User and Role associations
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// User and Response associations
db.user.hasMany(db.response, {
  foreignKey: "userId"
})
db.response.belongsTo(db.user)

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

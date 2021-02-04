module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("Admin", {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING
    },
    salt: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  }, {
    tableName: 'emr_admin',
    timestamps: false
  });

  return Admin;
};
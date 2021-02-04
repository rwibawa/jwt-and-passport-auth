const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const shajs = require('sha.js');

// Connect to MySQL
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_DB_USER, process.env.MYSQL_DB_PASSWORD, {
  host: process.env.MYSQL_DB_URI,
  port: process.env.MYSQL_DB_PORT,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');

    const Admin = require('../model/admin.model')(sequelize, Sequelize);
    await Admin.sync();

    /*
    const users = await Admin.findAll({
      where: {
        username: 'FLinick'
      }
    });

    if (users.length === 0) {
      return;
    }

    console.log('users', JSON.stringify(users));
    const user = users[0];
    const shajs = require('sha.js');
    const hash = shajs('sha256').update('hello#' + user.salt).digest('hex');
    console.log('hashed password', hash);
    */

    passport.use(
      'login',
      new localStrategy(
        {
          usernameField: 'username',
          passwordField: 'password'
        },
        async (username, password, done) => {
          try {
            const user = await Admin.findOne({
              where: {
                username: username
              }
            });
    
            if (!user) {
              return done(null, false, { message: 'User not found' });
            }
    
            const hash = shajs('sha256').update(password + user.salt).digest('hex');
            if (hash !== user.password) {
              return done('router', null, { message: 'Wrong Password' });
            }
    
            return done(null, user, { message: 'Logged in Successfully' });
          } catch (error) {
            console.error(error);
            return done(error);
          }
        }
      )
    );
    
    passport.use(
      new JWTstrategy(
        {
          secretOrKey: 'TOP_SECRET',
          jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
          try {
            return done(null, token.user);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  
  } catch (error) {
    console.error('Unable to connect to the MySQL database:', error);
  }
})();

/*
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
*/

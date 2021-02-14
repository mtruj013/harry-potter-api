// Update with your config settings.
require('dotenv').config();
module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './data/hp.db3' // dtatabase name
  //   },
  //   useNullAsDefault: true, // for sqlite 
  //   pool: {
  //     afterCreate: (conn, done) => {
  //       conn.run('PRAGMA foreign_keys = ON', done) //for sqlite + foreign keys
  //     }
  //   },
  //   migrations: {
  //     directory: "./data/migrations"
  //   },
  //   seeds: {
  //     directory: "./data/seeds"
  //   }
  // },
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'hp_db',
      user:     'postgres',
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: "pg",
    connection: {
      filname: ":memory:"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};

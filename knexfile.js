// Update with your config settings.
require('dotenv').config();
module.exports = {

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
      filename: ":memory:",
      database: 'hp_db',
      user:     'postgres',
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};

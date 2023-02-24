import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const db = new Sequelize('tcollections', 'timy02', 'i6P22vvMs9A*.Xd', {
  host: 'db4free.net',
  dialect: 'mysql',
  dialectModule: mysql2,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    connectTimeout: 60000,
    options: {
      requestTimeout: 3000
    }
  },
  define: {
    timestamps: false
  }
}); 

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default db;
import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const db = new Sequelize('sql8596215', 'sql8596215', 'NE7ZpDHl65', {
  host: 'sql8.freesqldatabase.com',
  dialect: 'mysql',
  dialectModule: mysql2,
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
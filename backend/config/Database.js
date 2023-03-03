import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const db = new Sequelize('railway', 'root', 'WiTiYaW7hphPTjhm5AfC', {
  host: 'containers-us-west-179.railway.app',
  dialect: 'mysql',
<<<<<<< HEAD
  dialectModule: mysql2,
  port: 5591,
=======
  port: 6573,
>>>>>>> dev
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    connectTimeout: 60000,
    options: {
      requestTimeout: 20000
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
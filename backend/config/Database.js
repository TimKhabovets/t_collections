import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const db = new Sequelize('railway', 'root', 'WiTiYaW7hphPTjhm5AfC', {
  host: 'containers-us-west-179.railway.app',
  dialect: 'mysql',
  port: 6573,
  pool: {
    max: 6,
    min: 0,
    acquire: 50000,
    idle: 10000,
    evict: CURRENT_LAMBDA_FUNCTION_TIMEOUT
  },
  dialectOptions: {
    connectTimeout: 60000,
    requestTimeout: 20000,
    options: {
      requestTimeout: 20000,
      connectTimeout: 20000,
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
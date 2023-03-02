import { Sequelize } from 'sequelize';

const db = new Sequelize('railway', 'root', 'fMeBkwTjWTyZyKdYkr7Y', {
  host: 'containers-us-west-83.railway.app',
  dialect: 'mysql',
  port: 5591,
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
import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Photo = db.define('photos', {
  url: DataTypes.STRING,      
}, {
  freezeTableName: true
});

export default Photo;

(async () => {
  await db.sync();
})();
import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Field = db.define('fields', {
  name: DataTypes.STRING,
  value: DataTypes.STRING,
  item: DataTypes.INTEGER
}, {
  freezeTableName: true
});

export default Field;

(async () => {
  await db.sync();
})();
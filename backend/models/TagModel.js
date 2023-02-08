import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Tag = db.define('tags', {
  name: DataTypes.STRING,
}, {
  freezeTableName: true
});

export default Tag;

(async () => {
  await db.sync();
})();
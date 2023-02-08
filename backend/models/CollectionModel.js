import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Collection = db.define('collections', {
  name: DataTypes.STRING,
  topic: DataTypes.STRING,
  comment: DataTypes.STRING,
  photo: DataTypes.TINYINT,
  author: DataTypes.INTEGER
}, {
  freezeTableName: true
});

export default Collection;

(async () => {
  await db.sync();
})();
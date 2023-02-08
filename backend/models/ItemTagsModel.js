import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Item = db.define('item-tags', {
  tag_id: DataTypes.INTEGER,
  item_id: DataTypes.INTEGER,
}, {
  freezeTableName: true
});

export default Item;

(async () => {
  await db.sync();
})();
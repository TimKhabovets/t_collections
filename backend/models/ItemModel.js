import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Item = db.define('items', {
  name: DataTypes.STRING,
  collection: DataTypes.INTEGER,
    
}, {
  freezeTableName: true
});

export default Item;

(async () => {
  await db.sync();
})();
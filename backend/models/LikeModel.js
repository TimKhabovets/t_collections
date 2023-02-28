import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Like = db.define('likes', {
  user: DataTypes.INTEGER,  
  item: DataTypes.INTEGER,    
}, {
  freezeTableName: true
});

export default Like;

(async () => {
  await db.sync();
})();
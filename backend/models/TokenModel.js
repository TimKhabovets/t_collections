import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Token = db.define('tokens', {
  user: DataTypes.STRING,
  refreshToken: DataTypes.STRING,
}, {
  timestamps: false,
  freezeTableName: true
});

export default Token;

(async () => {
  await db.sync();
})();
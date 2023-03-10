import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const User = db.define('users', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  status: DataTypes.STRING,
  role: DataTypes.STRING
}, {
  timestamps: false,
  freezeTableName: true
});

export default User;

(async () => {
  await db.sync();
})();
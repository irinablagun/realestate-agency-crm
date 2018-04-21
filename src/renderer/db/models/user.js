import sequelize from '../../libs/sequelize';
import Sequelize from 'sequelize';
import crypto from 'crypto';

const UserModel = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fn: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    ln: Sequelize.STRING,
    pn: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    hashedPassword: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    salt: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    underscored: true,
    setterMethods: {
      password(password) {
        this.setDataValue('salt', this.createSalt());
        this.setDataValue('hashedPassword', this.encryptPassword(password));
      }
    }
  }
);

UserModel.prototype.createSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

UserModel.prototype.encryptPassword = function(password) {
  return crypto
    .createHmac('sha1', this.salt)
    .update(password)
    .digest('hex');
};

UserModel.prototype.authenticate = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

export default UserModel;
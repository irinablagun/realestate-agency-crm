import crypto from 'crypto';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fio: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      salt: {
        type: DataTypes.STRING,
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
  
  User.prototype.createSalt = function() {
    return crypto.randomBytes(16).toString('base64');
  };
  
  User.prototype.encryptPassword = function(password) {
    return crypto
      .createHmac('sha1', this.salt)
      .update(password)
      .digest('hex');
  };
  
  User.prototype.authenticate = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
  };
  
  return User;
}
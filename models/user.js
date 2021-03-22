'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A name is required'
        },
        notEmpty: {
          msg: "Name can not be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This email is taken, please use a unique email'
      },
      validate: {
        notNull: {
          msg: 'An email is required'
        },
        isEmail: {
          msg: "A valid email must be provided"
        }
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A birthday value is required'
        },
        notEmpty: {
          msg: "Birthday can not be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required'
        },
        notEmpty: {
          msg: "The password can not be empty"
        }
      }
    }
  }, { sequelize });

  return User;
};
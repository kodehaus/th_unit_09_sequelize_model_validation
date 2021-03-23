'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
        },
        isDate: {
          msg: 'Birthday must be a valid date value'
        }
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required'
        },
        notEmpty: {
          msg: "The password can not be empty"
        },
        len: {
          args: [8,20],
          msg: 'The password should be between 8 and 20 characters long'
        }
      }
    },
    confirmedPassword: { // new attribute
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        console.log('-----------------------------------------val:' + val)
        console.log('--------------------------------------------this.password:' + this.password)
        if(val === this.password){
          const hashedPword = bcrypt.hashSync(val, 10);
          this.setDataValue('confirmedPassword', hashedPword);
        }
      },
      validate: {
        notNull: {
          msg: 'Both passwords must match'
        }
      }
    }
  }, { sequelize });

  return User;
};
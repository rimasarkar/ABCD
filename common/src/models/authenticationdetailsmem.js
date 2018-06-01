'use strict'
// Model exports category list
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('authentication_details_mem', {
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('A', 'I'),
      allowNull: false
    },
    attribute_1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attribute_2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attribute_3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attribute_4: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attribute_5: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    added_by: {
      type: DataTypes.STRING(75),
      allowNull: false,
      defaultValue: 'SYS'
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_by: {
      type: DataTypes.STRING(75),
      allowNull: false,
      defaultValue: 'SYS'
    },
    updated_date: {
      type: DataTypes.TIME,
      allowNull: false
    }
  },
    {
      timestamps: false,
      freezeTableName: true
    }, {
      tableName: 'authentication_details_mem'
    })
}

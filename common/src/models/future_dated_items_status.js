/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('future_dated_items_status', {
    future_dated_item_status: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('A','I'),
      allowNull: false,
      defaultValue: "A"
    },
    attribute_1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attribute_2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attribute_3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attribute_4: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attribute_5: {
      type: DataTypes.STRING,
      allowNull: true
    },
    added_by: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SYS"
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SYS"
    },
    updated_date: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'future_dated_items_status'
  });
};

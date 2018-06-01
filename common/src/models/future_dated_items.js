'use strict'

// Model exports product_instance table
module.exports = function (sequelize, DataTypes) {
var future_dated_items = sequelize.define('future_dated_items', {

  enterprise_item_id: {
    type: DataTypes.INTEGER(50),
    allowNull: false,
  },
    future_provision_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  future_dated_item_status: {
    type: DataTypes.STRING(30),
    allowNull: false,
    references: {
      model: 'future_dated_item_status',
      key: 'future_dated_item_status'
    }
  },
  transaction_type: {
    type: DataTypes.STRING(30),
    allowNull: false,
    references: {
      model: 'transaction_type',
      key: 'transaction_type'
    }
  },
  content_json: {
    type: DataTypes.JSON,
    allowNull: false,
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
})
future_dated_items.removeAttribute("id");
return future_dated_items;
}

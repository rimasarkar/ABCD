/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('billing_sfdc_errors', {
    enterprise_item_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(2400),
      allowNull: false
    },
    json_obj: {
      type: DataTypes.JSON,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('PND','COM','ERR','NEW'),
      allowNull: false,
      defaultValue: 'PND'
    },
    error_description: {
      type: DataTypes.STRING(2400),
      allowNull: true
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
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {timestamps: false,
  freezeTableName : true},
   {
    tableName: 'billing_sfdc_errors'
  });
};

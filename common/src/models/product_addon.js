/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_addon', {
    product_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    product_tier: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    addon_product_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    addon_product_tier: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING,
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
    tableName: 'product_addon'
  });
};

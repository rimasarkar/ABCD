/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_instance_mem', {
    product_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_tier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    enterprise_item_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  },{
      timestamps: false,
      freezeTableName: true
    }, {
    tableName: 'product_instance_mem'
  });
};

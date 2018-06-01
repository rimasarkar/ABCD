/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_instance_status_setup', {
    recent_transaction: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    peding_new_wf: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    instance_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fulfilment_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notify_billing: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nofity_sf_flag: {
      type: DataTypes.ENUM(1),
      allowNull: false
    },
    added_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'product_instance_status_setup'
  });
};

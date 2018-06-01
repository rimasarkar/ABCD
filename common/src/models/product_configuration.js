/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_configuration', {
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "A"
    },
    product_descr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dup_by_eaid_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N"
    },
    dup_by_blid_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N"
    },
    addon_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N"
    },
    allow_new_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N"
    },
    allow_update_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N"
    },
    allow_upgrade_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N"
    },
    allow_downgrade_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N"
    },
    allow_suspend_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N"
    },
    allow_resume_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N"
    },
    allow_cancel_flag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N"
    },
    external_udac: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logging_level: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "ERROR"
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
    tableName: 'product_configuration'
  });
};

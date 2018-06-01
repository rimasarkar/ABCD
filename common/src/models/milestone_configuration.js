/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('milestone_configuration', {
    product_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    product_tier: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    transaction_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    sales_channel_code: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    milestone_id: {
      type: DataTypes.INTEGER(25),
      allowNull: true,
      references: {
        model: 'milestone_setup',
        key: 'milestone_id'
      }
    },
    sequence: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    fullfilment_milestone_flag: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('A','I'),
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
  },{  timestamps: false,freezeTableName : true}, {
    tableName: 'milestone_configuration'
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workflow_history', {
    instance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      primaryKey: true
    },
    sequence: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    process_id: {
      type: DataTypes.STRING(11),
      allowNull: true,
      primaryKey: true
    },
    transaction_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    workflow_started_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    workflow_completed_datetime: {
      type: DataTypes.DATE,
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
  },  {
      timestamps: false,
      freezeTableName: true
    }, {
    tableName: 'workflow_history'
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('milestone_setup', {
    milestone_id: {
      type: DataTypes.INTEGER(25),
      allowNull: false,
      primaryKey: true
    },
    milestone_description: {
      type: DataTypes.STRING(250),
      allowNull: false
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
  }, {
    tableName: 'milestone_setup'
  });
};
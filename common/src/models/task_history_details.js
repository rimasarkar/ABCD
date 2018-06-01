
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task_history_details', {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'task_history',
        key: 'task_id'
      }
    },
    sequence: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false
    },
    result_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    result_value: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
      timestamps: false,
      freezeTableName: true
    },{
    tableName: 'task_history_details'
  });
};

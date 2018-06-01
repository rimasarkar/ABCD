
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task_history', {
    Enterprise_item_id: {
      type: DataTypes.INTEGER(25),
      primaryKey: true,
      allowNull: true,
      references: {
        model: 'product_instance',
        key: 'enterprise_item_id'
      }
    },
    product_instance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Parent_process_id: {
      type: DataTypes.INTEGER(25),
      primaryKey: true,
      allowNull: false
    },
    milestone_id: {
      type: DataTypes.INTEGER(25),
      allowNull: false,
      primaryKey: true
    },
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    task_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user: {
      type: DataTypes.STRING,
      allowNull: true
    },
    datetimestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
      timestamps: false,
      freezeTableName: true
    },{
    tableName: 'task_history'
  });
}; 

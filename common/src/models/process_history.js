/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('process_history', {
    product_instance_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'product_instance',
        key: 'product_instance_id'
      }
    },
    product_descr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    task_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    task_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'transaction_types',
        key: 'transaction_type'
      }
    },
    completed_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    completed_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    order_received_start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    manual_assign_complete_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    disposition: {
      type: DataTypes.STRING,
      allowNull: true
    },
    outcome: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attendees: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    task_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sla_time: {
      type: DataTypes.DATE,
      allowNull: true
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
  }, 
    {
      timestamps: false,
      freezeTableName: true
    },{
    tableName: 'process_history'
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('milestone_details', {
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
    milestone_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sequence_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    milestone_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'transaction_types',
        key: 'transaction_type'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    milestone_type: {
      type: DataTypes.STRING,
      allowNull: false
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
      timestamps: false,
      freezeTableName: true
    },{
    tableName: 'milestone_details'
  });
};

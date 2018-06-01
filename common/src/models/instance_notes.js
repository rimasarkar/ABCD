
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('product_instance_notes', {
    enterprise_item_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
      references: {
        model: 'product_instance',
        key: 'product_instance_id'
      }
    },
    product_instance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sequence: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false
    },
    notes: {
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
    }, {
      tableName: 'product_instance_notes'
    });
};

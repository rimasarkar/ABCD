/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_instance', {
    product_instance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_type: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'product_configuration',
        key: 'product_type'
      }
    },
    product_tier: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'product_configuration',
        key: 'product_tier'
      }
    },
    instance_status: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'instancestatus',
        key: 'instance_status'
      }
    },
    workflow_status: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'fulfilmentstatus',
        key: 'fulfilment_status'
      }
    },
    recent_transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'transaction_types',
        key: 'transaction_type'
      }
    },
    parent_process_id: {
      type: DataTypes.INTEGER(25),
      allowNull: true
    },
    enterprise_item_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    primary_item_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    enterprise_account_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    business_location_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sales_channel_code: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'sales_channel',
        key: 'sales_channel_code'
      }
    },
    service_start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    service_end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    future_provision_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    previous_item_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source_system: {
      type: DataTypes.STRING,
      allowNull: false
    },
    future_cancel_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    billing_trigger_date: {
      type: DataTypes.DATE,
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
    tableName: 'product_instance'
  });
};

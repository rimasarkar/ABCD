/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seo_fulfillment_data_history', {
    product_instance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'product_instance',
        key: 'product_instance_id'
      }
    },
    his_seq: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    contact_first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_email_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    primary_city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proposal_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    confirmation_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    primary_category_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    primary_category_name: {
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
    tableName: 'seo_fulfillment_data_history'
  });
};

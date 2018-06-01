/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seo_website_url_list', {
    product_instance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'product_instance',
        key: 'product_instance_id'
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dexmedia_site_flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    primary_flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    new_site_flag: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
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
    tableName: 'seo_website_url_list'
  });
};

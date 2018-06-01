/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('reference_key_table', {
        object_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      object_type: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      reference_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
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
        allowNull: true
      },
      added_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: true
      },
      updated_date: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'reference_key_table'
    });
  };
  
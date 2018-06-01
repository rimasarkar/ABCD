/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('process_milestones', {
        parent_process_id: {
            type: DataTypes.INTEGER(25),
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'product_instance',
                key: 'parent_process_id'
            }
        },
        product_instance_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            },
        child_process_id: {
            type: DataTypes.INTEGER(25),
            allowNull: false,
            references: {
                model: 'process_milestones',
                key: 'child_process_id'
            }
        },
        milestone_id: {
            type: DataTypes.INTEGER(25),
            allowNull: false,
            model: 'process_milestones',
            key: 'milestone_id'
        },
        sequence: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            model: 'process_milestones',
            key: 'sequence'
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
        added_by: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "SYS"
        },
        added_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_DATE')
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
            tableName: 'process_milestones'
        });
};
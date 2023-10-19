const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

class Log extends Model {}

Log.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      }
    },
    ticketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        referemces: {
            model: "user",
            key: "id",
        }
      },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Message",
        validate: {
            isIn: {
              args: [["Created", "Modified", "Message"]],
              msg: 'Status must be "Created", "Modified", or "Message"',
            },
          },
      },
    isHidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'log',
  }
);

module.exports = Log;


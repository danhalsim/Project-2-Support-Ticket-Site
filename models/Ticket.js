const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const Log = require("./Log"); 
const { findDiff, formatDate } = require("../utils/helpers");

class Ticket extends Model {
  logChange(userId, oldData) {
    // This method will use the findDiff helper method, passing along the changed ticket instance and the previous ticket values.
    const changes = findDiff(this, oldData);

    // This method will return early if no changes are found.
    if (changes.length === 0) {
      return;
    };

    const date = new Date()

    // Create a Log entry
    return Log.create({
      type: "Modified",
      message: `${changes.length} changes were made on ${formatDate(date)} by ${userId}.`,
      userId: userId, // The Log.userId field's value will be passed as the argument to this method
      ticketId: this.id, // The Log.ticketId field will be a reference to the instance id
    });
  }
};

Ticket.init(
  {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", 
        key: "id", 
      },
    },
    techId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user", 
        key: "id", 
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Open",
      validate: {
        isIn: {
          args: [["Open", "Pending", "Resolved", "Claimed"]],
          msg: 'Status must be "Open", "Pending", "Resolved", or "Claimed"',
        },
      },
    },
    urgency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Low",
      validate: {
        isIn: {
          args: [["Low", "Medium", "High"]],
          msg: 'Urgency must be "Low", "Medium", or "High"',
        },
      },
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "ticket",
    hooks: {
      afterCreate: async (ticket, options) => {
        await Log.create({
          type: "Created",
          message: `Ticket number ${ticket.id} created.`,
          userId: ticket.clientId,
          ticketId: ticket.id,
        });
      },
      afterUpdate: async (ticket, options) => {
        if (ticket.changed("status") && ticket.status === "Resolved") {
          await ticket.update({ isArchived: true }, { fields: ["isArchived"] });
        }
      },
    },
  }
);

module.exports = Ticket;
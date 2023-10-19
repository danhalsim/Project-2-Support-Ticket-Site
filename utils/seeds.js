const sequelize = require("../utils/connection");
const { User, Ticket } = require("../models");

const userData = require("./seeds/userData.json");
const ticketData = require("./seeds/ticketData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Ticket.bulkCreate(ticketData, {
        individualHooks: true,
        returning: true,
    });
    
    process.exit(0);
};

seedDatabase();
const router = require("express").Router();

const logRoutes = require("./logRoutes");
const ticketRoutes = require("./ticketRoutes");
const userRoutes = require("./userRoutes");

router.use("/log", logRoutes);
router.use("/ticket", ticketRoutes);
router.use("/user", userRoutes);

module.exports = router;

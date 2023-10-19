const router = require("express").Router();

const apiRoutes = require("./api");
const handlebarsRoutes = require("./handlebarsRoutes.js");

router.use("/", handlebarsRoutes);
router.use("/api", apiRoutes);

module.exports = router;

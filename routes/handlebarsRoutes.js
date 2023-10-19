const router = require("express").Router();
const withAuth = require("../utils/auth");

const {
  showLogin,
  showDashboard,
  showTicket
} = require("../controllers/handlebarControllers")

router.route("/login")
  .get(showLogin);

router.route("/:status?")
  .get(withAuth, showDashboard);

router.route("/ticket/:id")
  .get(withAuth, showTicket);

module.exports = router;
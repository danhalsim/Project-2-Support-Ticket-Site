const router = require("express").Router();

const {
    loginUser,
    logoutUser
} = require("../../controllers/userControllers")

router.route("/")
    .post(loginUser)
    .delete(logoutUser);

module.exports = router;

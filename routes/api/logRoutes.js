const router = require("express").Router();

const {
    createLog,
    editLog,
    deleteLog
} = require("../../controllers/logControllers")

router.route("/:ticketId")
    .post(createLog);

router.route("/:ticketId/:logId")
    .put(editLog)
    .delete(deleteLog);

module.exports = router;

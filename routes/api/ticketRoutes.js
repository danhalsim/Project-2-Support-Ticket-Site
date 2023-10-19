const router = require("express").Router();

const {
    createTicket,
    editTicket,
    archiveTicket
} = require("../../controllers/ticketControllers")

router.route("/")
    .post(createTicket);

router.route("/:id")
    .put(editTicket)
    .delete(archiveTicket);

module.exports = router;

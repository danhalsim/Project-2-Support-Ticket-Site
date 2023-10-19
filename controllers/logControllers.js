const { Log } = require("../models");

module.exports = {
    createLog: async function (req, res) {
        try {
            const { message} = req.body;
            if (!message) {
                res.status(400).json({message: "Please provide all required feilds!"});
                return;
            }
            const newLog = await Log.create({
                userId: req.session.id,
                ticketId: req.params.ticketId,
                message,
                type: "Created",
                isHidden: false
            });
            res.status(200).json(newLog).redirect(`/ticket/${req.params.ticketId}`);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    editLog: async function (req, res) {
        try {
            const log = await Log.findByPk({
                where: {
                    id: req.params.logId
                }
            });
            if (!log) {
                res.status(404).json({message: "No log found with this id!"});
                return;
            }
            log.message = req.body.message;
            log.type = "Modified";
            await log.save();
            res.status(200).json(log).redirect(`/ticket/${req.params.ticketId}`);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteLog: async function (req, res) {
        try {
            const logData = await Log.destroy({
                where: {
                    ticketId: req.params.ticketId,
                }
            });
            if (!logData) {
                res.status(404).json({ message: "No log found with this ticket id!"});
                return;
            }
            res.status(200).json(logData);
        } catch (err) {
            res.status(500).json(err).redirect(`/ticket/${req.params.ticketId}`);
        }
    }
};
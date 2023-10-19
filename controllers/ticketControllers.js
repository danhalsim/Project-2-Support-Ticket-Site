const { Ticket } = require("../models");

module.exports = {
    createTicket: async function (req, res) {
        try {
            const { subject, description, status, urgency } = req.body;
            if (!subject && !description && !status && !urgency) {
                res.status(400).json({message: "Please provide all required feilds!"});
                return;
            }
            const newTicket = await Ticket.create({
                clientId: req.session.id,
                techId: null,
                subject,
                description,
                status,
                urgency,
                isArchived: false
            });
            res.status(200).json(newTicket).redirect(`/ticket/${newTicket.id}`);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    editTicket: async function (req, res) {
        try {
            const ticket = await Ticket.findByPk(req.params.id);
            const newTicket = { ...ticket };
            if (!ticket) {
              res.status(404).json({message: "No ticket found with this id!"});
              return;
            }
            const { techId, subject, description, status, urgency} = newTicket;
            subject = req.body.subject;
            description = req.body.description;
            status = req.body.status;
            urgency = req.body.urgency;
            if(req.body.techId) {
                techId = req.body.techId;
                status = "Claimed";
            }
            await newTicket.save();
            newTicket.logChange(req.session.id, ticket)
            res.status(200).json(newTicket).redirect(`/ticket/${req.params.id}`);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    archiveTicket: async function (req, res) {
        try {
            const ticket = await Ticket.findOne({
                where: {
                    id: req.params.id
                }
            });
            ticket.status = "Resolved";
            ticket.isArchived = true;
            await ticket.save();
            res.status(200).json(ticket).redirect(`/ticket/${req.params.id}`);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
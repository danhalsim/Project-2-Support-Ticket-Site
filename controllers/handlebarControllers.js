const { Ticket, User, Log } = require("../models");

module.exports = {
  showLogin: async function (req, res)  {
    try {
      if(req.session.loggedIn) {
        res.status(401).redirect("/");
      } else {
        res.render("login", {layout: "login.handlebars"});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  showDashboard: async function (req, res)  {
    try {
      let plainTicketData;
      const status = req.params.status || "";
      if(status == "") {
        if(req.session.role == "client") {
          const ticketClientData = await Ticket.findAll({
            where: {
              clientId: req.session.id,
              isArchived: false
            },
            include: [{
              model: User,
              as: "client",
              attributes: ["id", "firstName", "lastName", "role"]
            },
            {
              model: User,
              as: "tech",
              attributes: ["id", "firstName", "lastName", "role"]
            }]
          })
          if (ticketClientData.length == 0) {
            res.status(404).json({message: "No tickets found for this client"})
          } else {
            plainTicketData = ticketClientData.map((ticketClientDataInfo) => ticketClientDataInfo.get({ plain: true }));
          }
        }
        if(req.session.role == "tech") {
          const ticketTechData = await Ticket.findAll({
            where: {
              techId: req.session.id,
              isArchived: false
            },
            include: [{
              model: User,
              as: "client",
              attributes: ["id", "firstName", "lastName", "role"]
            },
            {
              model: User,
              as: "tech",
              attributes: ["id", "firstName", "lastName", "role"]
            }]
          })
          if (ticketTechData.length == 0) {
            res.status(404).json({message: "No tickets found for this tech"})
          } else {
            plainTicketData = ticketTechData.map((ticketTechDataInfo) => ticketTechDataInfo.get({ plain: true }));
          }
        }
      } else {
        if(req.session.role == "client") {
          const ticketClientData = await Ticket.findAll({
            where: {
              clientId: req.session.id,
              isArchived: false,
              status: status
            },
            include: [{
              model: User,
              as: "client",
              attributes: ["id", "firstName", "lastName", "role"]
            },
            {
              model: User,
              as: "tech",
              attributes: ["id", "firstName", "lastName", "role"]
            }]
          })
          if (ticketClientData.length == 0) {
            res.status(404).json({message: "No tickets found for this client"})
          } else {
            plainTicketData = ticketClientData.map((ticketClientDataInfo) => ticketClientDataInfo.get({ plain: true }));
          }
        }
        if(req.session.role == "tech") {
          const ticketTechData = await Ticket.findAll({
            where: {
              techId: req.session.id,
              isArchived: false,
              status: status
            },
            include: [{
              model: User,
              as: "client",
              attributes: ["id", "firstName", "lastName", "role"]
            },
            {
              model: User,
              as: "tech",
              attributes: ["id", "firstName", "lastName", "role"]
            }]
          })
          if (ticketTechData.length == 0) {
            res.status(404).json({message: "No tickets found for this tech"})
          } else {
            plainTicketData = ticketTechData.map((ticketTechDataInfo) => ticketTechDataInfo.get({ plain: true }));
          }
        }
      }
      res.render("home", {layout: "main.handlebars", title: "Dashboard", userType: req.session.role, loggedIn: req.session.loggedIn, plainTicketData});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  showTicket: async function (req, res)  {
    try {
      if (req.session.role == "client") {
        if (req.session.id != req.params.id) {
          res.status(401).redirect("/");
        }
      }
      const ticket = await Ticket.findOne({
        where: {
          id: req.params.id,
        },
        include: [{
          model: User,
          as: "client",
          attributes: ["id", "firstName", "lastName", "role"]
        },
        {
          model: User,
          as: "tech",
          attributes: ["id", "firstName", "lastName", "role"]
        },
        {
          model: Log
        }]
      })
      if (ticket.isArchived) {
        res.status(401).redirect("/");
      }
      const plainTicket = ticket.map((ticketInfo) => ticketInfo.get({ plain: true }));
      res.render("ticket", {layout: "main.handlebars", title: "Ticket Details", userType: req.session.role, loggedIn: req.session.loggedIn, plainTicket});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
const { query } = require("express");
const {Ticket} = require("../models/user.model")

exports.add_user =  async (req , res) => {

    try {

       const { status, user , seatNumber } = req.body;

       const existSeatNumber = await Ticket.findOne({seatNumber})
       
       if(existSeatNumber){

          return res.status(400).json("seatNumber already exists")
       }
       const ticket = await Ticket.create(req.body);
   
       if (!ticket) {
           return res.status(404).json({ error: 'Ticket not found' });
       }

       return res.json(ticket);
   
     } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Internal server error' });
     }
   }
   


exports.update_status =  async (req , res) => {

 try {

    const  { seatNumber }  = req.params ;
    const { status} = req.body;
    
    const ticket = await Ticket.findOneAndUpdate(
      { seatNumber },
      { status },
      { new: true }
    );

    if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    return res.json(ticket);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


exports.View_Ticket_Status =  async (req , res) => {

    try {

    const  { seatNumber }  = req.params ;
    const ticket = await Ticket.findOne({ seatNumber });
    ticket.seatNumber = undefined;
    ticket.user.name = undefined;
    ticket.user.email = undefined
        
        if (!ticket) {
          return res.status(404).json({ error: 'Ticket not found' });
        }
        
        return res.json(ticket);
     } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Internal server error' });
     }
   }

   
exports.View_all_closed_tickets =  async (req , res) => {

    try {
       
     const closedTickets = await Ticket.find({status:"close"})

    return res.json(closedTickets);

     } catch (error) {
       console.error(error.message);
       return res.status(500).json({ error: 'Internal server error' });
     }
   }


   exports.View_all_open_tickets =  async (req , res) => {

    try {
       
        const openTickets = await Ticket.find({ status:"open"});

        return res.json(openTickets);

     } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Internal server error' });
     }
   }

   exports.person_owning_the_ticket =  async (req , res) => {

    try {

        const  { seatNumber }  = req.params ;
        const ticket = await Ticket.findOne({ seatNumber });

        if (!ticket) {
          return res.status(404).json({ error: 'Ticket not found' });
        }
    
        if (!ticket.user) {
          return res.status(404).json({ error: 'Ticket does not have a user' });
        }
    
        return res.json(ticket.user);

     } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Internal server error' });
     }
   }   


   exports.Reset =  async (req , res) => {

    try {

     await Ticket.updateMany({}, { status: "open" , user: null });

    return res.json({ message: 'Server reset successful' });

     } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Internal server error' });
     }
   }
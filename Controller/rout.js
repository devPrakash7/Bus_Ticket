
const expres = require("express");
const { View_Ticket_Status, View_all_closed_tickets, View_all_open_tickets, person_owning_the_ticket, Reset, add_user, update_status } = require("./controller");
const router = expres.Router();

// Define API endpoints
// add_user
router.post('/tickets/add_user' , add_user);
// 1. Update the ticket status (open/close)
router.put('/tickets/:seatNumber' , update_status);
// 2. View Ticket Status
router.get('/tickets/:seatNumber' , View_Ticket_Status);
// 3. View all closed tickets
router.get('/tickets/closed' , View_all_closed_tickets);
// 4. View all open tickets
router.get('/tickets/open' , View_all_open_tickets);
// 5. View Details of the person owning the ticket
router.get('/tickets/:seatNumber/details' , person_owning_the_ticket);
// 6. Additional API for admin to reset the server (opens up all the tickets)
router.post('/reset' , Reset)


module.exports = router;
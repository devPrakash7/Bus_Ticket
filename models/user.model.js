
const mongoose = require("mongoose");


const ticketSchema = new mongoose.Schema({
  seatNumber: { type: Number, unique: true },
  status: { type: String , default : "open"},
  user: {
    name: String,
    email: String,
  },
})


const Ticket = mongoose.model("ticket",ticketSchema);
 
module.exports =   {Ticket}
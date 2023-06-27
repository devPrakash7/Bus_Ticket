
const mongoose = require("mongoose");
const { MONGODB_URI } = require("../keys/development_key")

// mongoDb connnected

mongoose
    .connect(MONGODB_URI, {

        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("running port........");
    })
    .catch((error) => {

        console.log(error);
    });

    

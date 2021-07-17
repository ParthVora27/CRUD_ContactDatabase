const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //removes unwanted space
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
})

//we need to create a collection
mongoose.model("Contact", ContactSchema);

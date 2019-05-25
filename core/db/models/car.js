const mongoose = require("mongoose");
module.exports = {
  Car: mongoose.model("Car", {
    model: String,
    board: String,
    year: Number,
    value: Number
  })
};

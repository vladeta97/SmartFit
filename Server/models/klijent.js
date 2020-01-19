const mongoose = require("mongoose");
var Klijent = mongoose.model("klijent", {
  ime: { type: String },
  prezime: { type: String },
  visina: { type: Number },
  tezina: { type: Number },
  bodyFat: { type: Number },
  iskustvo: { type: String },
  ciljVezbanja: { type: String },
  userName: { type: String },
  password: { type: String },
  instruktori: { type: [String] }
});

module.exports = { Klijent };

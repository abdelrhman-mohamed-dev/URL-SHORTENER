const mongoose = require("mongoose");
const shortid = require("shortid");

const shortUrlScema = new mongoose.Schema({
  Full: { type: String, require: true },
  Short: {
    type: String,
    require: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("shortUrl", shortUrlScema);

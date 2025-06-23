const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    required: true
  },
  goal:{
    type: String,
    required: true
  },
  currentProgress: {
    type: Number,
    default: 0
  },
  dueDate: {
    type: Date,
    required: true
  },
  achieved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true 
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;

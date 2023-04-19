const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  
  created_ts: { type: Date, default: Date.now },
  updated_ts: { type: Date, default: null },
});

notesSchema.index({ created_ts: -1 })
notesSchema.index({ updated_ts: -1 })
notesSchema.index({ updated_ts: -1, created_ts: -1 })

module.exports = mongoose.model('User', notesSchema)

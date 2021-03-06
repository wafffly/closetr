const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfit_entries = new Schema({
  outfitEntryID: {type: String, default:'', trim:true},
  clothing: {ref: 'clothes', type: Schema.Types.ObjectId, trim:true},
  user: {ref: 'users', type: Schema.Types.ObjectId, trim:true},
  date: {type: String, default:'', trim:true}
})

module.exports = mongoose.model('outfit_entries', outfit_entries);

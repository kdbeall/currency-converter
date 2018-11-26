const mongoose = require('mongoose')

const queryHistorySchema = new mongoose.Schema({
  currencies: Object,
  queryDate: String,
  bankDate: String,
  conversion: String
})

module.exports = mongoose.model('QueryHistory', queryHistorySchema)

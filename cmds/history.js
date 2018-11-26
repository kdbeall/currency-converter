const QueryHistory = require('../models/schema')
const error = require('../utils/error')
const ora = require('ora')
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cconvert', { useNewUrlParser: true })

exports.history = async function history (args) {
  const spinner = ora().start()
  try {
    let queryDoc = await QueryHistory.find().sort({ _id: -1 }).limit(args._[1]).then(doc => { return doc }).catch(err => { throw err })
    spinner.stop()
    mongoose.connection.close()
    for (let i = 0; i < queryDoc.length; i++) {
      console.log(queryDoc[i].queryDate + ' ' + queryDoc[i].bankDate + ' ' + queryDoc[i].conversion)
    }
  } catch (err) {
    spinner.stop()
    mongoose.connection.close()
    error(err)
  }
}

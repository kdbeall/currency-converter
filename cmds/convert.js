const QueryHistory = require('../models/schema')
const ora = require('ora')
const error = require('../utils/error')
const getCurrencies = require('ecb-currencies')
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cconvert', { useNewUrlParser: true })

exports.convertCalc = function convertCalc (currencies, srcCurrency, srcAmount, destCurrency) {
  let srcEuros
  let destAmount
  if (srcCurrency === 'EUR' && destCurrency === 'EUR') {
    return srcAmount
  } else if (srcCurrency === 'EUR') {
    destAmount = srcAmount * currencies[destCurrency]
  } else if (destCurrency === 'EUR') {
    destAmount = srcAmount / currencies[srcCurrency]
  } else {
    srcEuros = srcAmount / currencies[srcCurrency]
    destAmount = srcEuros * currencies[destCurrency]
  }
  return destAmount.toFixed(2)
}

async function saveToMongo (currencies, queryDate, bankDate, conversion) {
  let query = new QueryHistory({ currencies: currencies, queryDate: queryDate, bankDate: bankDate, conversion: conversion })
  let doc = await query.save().then(doc => { return doc }).catch(err => { throw err })
  return doc
}

function printConversion (args, currencies) {
  let output = ''
  const srcCurrency = String(args._[1]).toUpperCase()
  const amount = args._[2]
  for (let i = 3; i < args['_'].length; i++) {
    let destCurrency = String(args['_'][i]).toUpperCase()
    output = output + ' ' + destCurrency + ' ' + exports.convertCalc(currencies.rates, srcCurrency, amount, destCurrency)
  }
  console.log(output)
  return output
}

exports.convert = async function convert (args) {
  const spinner = ora().start()
  try {
    const currencies = await getCurrencies()
    spinner.stop()
    let dateNow = new Date()
    console.log('Current ' + dateNow)
    const srcCurrency = String(args._[1]).toUpperCase()
    const amount = args._[2]
    let conversion = srcCurrency + ' ' + amount + printConversion(args, currencies)
    let queryDoc = await QueryHistory.find().sort({ _id: -1 }).limit(1).then(doc => { return doc }).catch(err => { throw err })
    if (queryDoc.length > 0) {
      console.log('Previous ' + queryDoc[0].queryDate)
      printConversion(args, queryDoc[0].currencies)
    }
    await saveToMongo(currencies, dateNow, currencies.date, conversion)
    mongoose.connection.close()
  } catch (err) {
    spinner.stop()
    mongoose.connection.close()
    error(err)
  }
}

const ora = require('ora')
const getCurrencies = require('ecb-currencies')

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
  return destAmount
}

exports.convert = async function convert (args) {
  const spinner = ora().start()
  let output = ''
  try {
    const currencies = await getCurrencies()
    const srcCurrency = String(args._[1]).toUpperCase()
    const amount = args._[2]
    for (let i = 3; i < args['_'].length; i++) {
      let destCurrency = String(args['_'][i]).toUpperCase()
      output = output + ' ' + destCurrency + ' ' + exports.convertCalc(currencies.rates, srcCurrency, amount, destCurrency)
    }
    console.log(output)
    spinner.stop()
  } catch (err) {
    spinner.stop()
    console.error(err)
  }
  return output
}

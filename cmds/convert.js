const ora = require('ora')
const getCurrencies = require('ecb-currencies')

exports.convertCalc = function convertCalc (currencies, srcCurrency, srcAmount, destCurrency) {
  let srcEuros
  if (srcCurrency === 'EUR') {
    srcEuros = srcAmount
  } else {
    srcEuros = srcAmount / currencies[srcCurrency]
  }
  if (destCurrency === 'EUR') {
    return srcEuros
  }
  let destAmount = srcEuros * currencies[destCurrency]
  return destAmount
}

exports.convert = async function convert () {
  const spinner = ora().start()
  try {
    const currencies = await getCurrencies()
    console.log(currencies)
    const srcCurrency = arguments[0]
    const amount = arguments[1]
    for (let i = 2; i < arguments.length; i++) {
      let destCurrency = arguments[i]
      console.log(arguments[i] + ' ' + exports.convertCalc(currencies, srcCurrency, destCurrency, amount))
    }
  } catch (err) {
    spinner.stop()
    console.error(err)
  }
}

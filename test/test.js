const Convert = require('../cmds/convert')

let currencyObj = {
  date: '2018-11-21',
  rates: {
    'USD': 1.1409,
    'JPY': 129.04,
    'BGN': 1.9558,
    'CZK': 26.002,
    'DKK': 7.4617,
    'GBP': 0.89108,
    'HUF': 321.63,
    'PLN': 4.2995,
    'RON': 4.6632,
    'SEK': 10.3143,
    'CHF': 1.1341,
    'ISK': 141.20,
    'NOK': 9.7290,
    'HRK': 7.4318,
    'RUB': 75.0963,
    'TRY': 6.0888,
    'AUD': 1.5725,
    'BRL': 4.3262,
    'CAD': 1.5144,
    'CNY': 7.9121,
    'HKD': 8.9361,
    'IDR': 16655.14,
    'ILS': 4.2603,
    'INR': 81.3520,
    'KRW': 1287.06,
    'MXN': 23.1180,
    'MYR': 4.7735,
    'NZD': 1.6686,
    'PHP': 59.593,
    'SGD': 1.5663,
    'THB': 37.593,
    'ZAR': 15.9020
  }
}

test('Convert yen to dollars', () => {
  expect(Convert.convertCalc(currencyObj.rates, 'JPY', 100, 'USD')).toBe('0.88')
})

test('Convert euros to dollars', () => {
  expect(Convert.convertCalc(currencyObj.rates, 'EUR', 1, 'USD')).toBe('1.14')
})

test('Convert yen to euros', () => {
  expect(Convert.convertCalc(currencyObj.rates, 'JPY', 100, 'EUR')).toBe('0.77')
})

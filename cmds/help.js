const menus = {
  main: `
      cconvert [command] <options>
  
      convert .............. convert between currencies
      history ............ show conversion history
      version ............ show package version
      help ............... show help menu for a command`,

  convert: `
      cconvert convert <input> <amount> <output_1>...<output_n>
      
      input .............. the input currency
      amount .............. the amount  of the input currency
      output .............. the output currency
      
      Example Usage:
        cconvert USD 1000 EUR JPY
      `,
  history: `
      cconvert history <n>
      
      n .............. limit the output the last n queries
      `,

}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}

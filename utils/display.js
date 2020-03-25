const boxen = require('boxen');
const chalk = require('chalk');
const sym = require('log-symbols');
const cyan = chalk.cyan;
const dim = chalk.dim;


const boxOpts = {
  padding: 1,
  margin: 1,
  float: 'center',
  borderStyle: 'round',
  borderColor: 'cyan'
}

const showTable = (table) => {
  if (table){
    const formattedTable = boxen(table.toString(), boxOpts)
    console.log(formattedTable)
  }
}


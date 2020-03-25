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

const infoStates = () =>
	console.log(
    dim(`
      \n${sym.info} ${cyan(`KEY:`)}
      ${dim(`❯ `)}${cyan(`State:`)} Name of the state
      ${dim(`❯ `)}${cyan(`Cases:`)} Total number of cases in a country
      ${dim(`❯ `)}${cyan(`Cases (today):`)} Cases in 24 hours GMT/UTC
      ${dim(`❯ `)}${cyan(`Deaths:`)} Total number of deaths in a state
      ${dim(`❯ `)}${cyan(`Deaths (today):`)} Deaths in 24 hours GMT/UTC
      ${dim(`❯ `)}${cyan(`Recovered:`)} Total number of recovered people
      ${dim(`❯ `)}${cyan(`Active:`)}  Total number of active patients
    `)
  );

  const infoCountries = () =>
  	console.log(
  		dim(`
  			\n${sym.info} ${cyan(`KEY:`)}
        ${dim(`❯ `)}${cyan(`Country:`)} Name of the country
        ${dim(`❯ `)}${cyan(`Cases:`)} Total number of cases in a country
        ${dim(`❯ `)}${cyan(`Cases (today):`)} Cases in 24 hours GMT/UTC
        ${dim(`❯ `)}${cyan(`Deaths:`)} Total number of deaths in a country
        ${dim(`❯ `)}${cyan(`Deaths (today):`)} Deaths in 24 hours GMT/UTC
        ${dim(`❯ `)}${cyan(`Recovered:`)} Total number of recovered people
        ${dim(`❯ `)}${cyan(`Active:`)}  Total number of active patients
        ${dim(`❯ `)}${cyan(`Critical:`)} Total number of critical patients
        ${dim(`❯ `)}${cyan(`Per Million:`)} Affected patients per million
      `)
  	);



exports.showTable = showTable
exports.infoStates = infoStates
exports.infoCountries = infoCountries

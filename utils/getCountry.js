const chalk = require('chalk');
const axios = require('axios');
const sym = require('log-symbols');
const comma = require('comma-number');
const red = chalk.red;
const green = chalk.green;
const white = chalk.white;
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const display = require('./display.js')

module.exports = async (spinner, table, states, countryName) => {
	if (countryName && !states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/countries/${countryName}`)
		);
		handleError(`API is down, try again later.`, err, false);
		const thisCountry = response.data;

		if (response.data === 'Country not found') {
			spinner.stopAndPersist({
				symbol: red('𐄂'),
				text: `Fetch Failed!`
			});
			console.log(
				`${red(
					`${sym.error} Nops. A country named "${countryName}" does not exist…`
				)}\n`
			);
			process.exit(0);
		}

		table.push([
			`—`,
			white(thisCountry.country),
			comma(thisCountry.cases),
			comma(thisCountry.todayCases),
			comma(thisCountry.deaths),
			comma(thisCountry.todayDeaths),
			comma(thisCountry.recovered),
			comma(thisCountry.active),
			comma(thisCountry.critical),
			comma(thisCountry.casesPerOneMillion)
		]);
		spinner.stopAndPersist({
			symbol: green('✓'),
			text: `${country.toUpperCase()} Data Fetched!`
		});

		// display.showTable(table);
		return table
	}
};

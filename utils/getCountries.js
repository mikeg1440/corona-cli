const axios = require('axios');
const chalk = require('chalk');
const cyan = chalk.cyan;
const dim = chalk.dim;
const white = chalk.white;
const green = chalk.green;
const comma = require('comma-number');
const { sortingKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');
const display = require('./display.js')


module.exports = async (
	spinner,
	table,
	states,
	countryName,
	{ sortBy, limit, reverse }
) => {
	if (!countryName && !states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/countries`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allCountries = response.data;

		// Limit.
		allCountries = allCountries.slice(0, limit);

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allCountries = orderBy(
			allCountries,
			[sortingKeys[sortBy]],
			[direction]
		);

		// Push selected data.
		allCountries.map((oneCountry, count) => {
			table.push([
				count + 1,
				white(oneCountry.country),
				comma(oneCountry.cases),
				comma(oneCountry.todayCases),
				comma(oneCountry.deaths),
				comma(oneCountry.todayDeaths),
				comma(oneCountry.recovered),
				comma(oneCountry.active),
				comma(oneCountry.critical),
				comma(oneCountry.casesPerOneMillion)
			]);
		});

		spinner.stopAndPersist({
			symbol: green('✓'),
			text: 'All Countries Data Received!'
		});
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
		// console.log(table.toString());
		// display.showTable(table)
		return table
	}
};

const axios = require('axios');
const chalk = require('chalk');
const cyan = chalk.cyan;
const white = chalk.white;
const green = chalk.green;
const dim = chalk.dim;
const comma = require('comma-number');
const { sortingStateKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');
const display = require('./display.js');

module.exports = async (spinner, table, states, { sortBy, limit, reverse }) => {
	if (states) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/states`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allStates = [];
		if (typeof(states) === 'string'){
			allStates = response.data.filter(state => state.state.toLowerCase() === states.toLowerCase())
		}else {
			allStates = response.data;
		}

		// Limit.
		allStates = allStates.slice(0, limit);

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allStates = orderBy(allStates, [sortingStateKeys[sortBy]], [direction]);

		// Push selected data.
		allStates.map((oneState, count) => {
			table.push([
				count + 1,
				white(oneState.state),
				comma(oneState.cases),
				comma(oneState.todayCases),
				comma(oneState.deaths),
				comma(oneState.todayDeaths),
				comma(oneState.active)
			]);
		});

		spinner.stopAndPersist({
			symbol: green('✓'),
			text: 'All State Data Received!'
		});
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
		// console.log(table.toString());
		// display.showTable(table);
		return table
	}
};

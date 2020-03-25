const sym = require('log-symbols');
const display = require('./display.js');
const chalk = require('chalk');
const cyan = chalk.cyan;
const dim = chalk.dim;


module.exports = async (lastUpdated, states, minimal) => {
	if (minimal) return console.log();
	states && display.infoStates();
	!states && display.infoCountries();

	console.log(
		`\n${sym.success} ${dim(
			`Original repo → https://git.io/corona-cli`
		)}\n${sym.info} ${dim(
			`Star repo for updates → https://git.io/carona-cli-2.0\n\n`
		)}`
	);

	console.log(dim(`${sym.info} ${cyan(`Last Updated:`)} ${lastUpdated}`));
};

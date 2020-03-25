const sym = require('log-symbols');
const display = require('./display.js');
const chalk = require('chalk');
const cyan = chalk.cyan;
const dim = chalk.dim;


module.exports = async (lastUpdated, states, minimal) => {
	if (minimal) return console.log();
	console.log(dim(`${sym.info} ${cyan(`Last Updated:`)} ${lastUpdated}`));
	states && infoStates();
	!states && infoCountries();
	states && display.infoStates();
	!states && display.infoCountries();

	console.log(
		`\n${sym.success} ${dim(
			`Star the repo for updates → https://git.io/corona-cli`
		)}\n${sym.info} ${dim(
			`Follow for more CLIs → https://twitter.com/MrAhmadAwais\n\n`
		)}`
	);
};

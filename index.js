#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
	handleError(`UNHANDLED ERROR`, err);
});

const ora = require('ora');
const spinner = ora({ text: 'Loading...\n', indent: 10 });
const Table = require('cli-table3');
const inquirer = require('inquirer');
const cli = require('./utils/cli.js');
const init = require('./utils/init.js');
const theEnd = require('./utils/theEnd.js');
const handleError = require('cli-handle-error');
const getStates = require('./utils/getStates.js');
const getCountry = require('./utils/getCountry.js');
const getWorldwide = require('./utils/getWorldwide.js');
const getCountries = require('./utils/getCountries.js');
const display = require('./utils/display.js');
const {
	style,
	single,
	colored,
	singleStates,
	coloredStates,
	borderless
} = require('./utils/table.js');
const xcolor = cli.flags.xcolor;
const sortBy = cli.flags.sort;
const reverse = cli.flags.reverse;
const limit = Math.abs(cli.flags.limit);
const minimal = cli.flags.minimal;
const options = { sortBy, limit, reverse, minimal };
const chalk = require('chalk');

// CHALK COLORS
// const green = chalk.green;
const yellow = chalk.yellow;
const cyan = chalk.cyan;


(async () => {
  const questions = [
    {
      name: 'menu',
      type: 'list',
      message: yellow('Choose a menu option'),
      choices: [
        {name: cyan(`Get all States data for USA`), value: 'usa'},
        {name: cyan('Get data for all Countries'), value: 'all'},
        {name: cyan('Get data for a given country'), value: 'country'},
        {name: cyan('Get data for specific state in USA'), value: 'states'}
      ]
    },
    {
      name: 'country',
      type: 'input',
      message: 'Enter a Country Name: ',
      default: 'USA',
      when: (ans) => ans.menu === 'country'
    },
    {
      name: 'state',
      type: 'input',
      message: 'Enter a state',
      default: 'Connecticut',
      when: (ans) => ans.menu === 'states'
    },
  ]

  // const thickBorder = { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
  //        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
  //        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
  //        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }


  states = false
	input = undefined
	if (input !== undefined){
		renderData(country, states, xcolor, minimal, spinner, options)
	}else {
		inquirer.prompt(questions).then(async ans => {
			console.log(ans)
			if (ans.menu === 'usa'){
				states = true
				country = ans.menu
			}else {
				states = ans.state
				country = ans.country
			}
			renderData(country, states, xcolor, minimal, spinner, options)
			// console.log(`states: ${states}\ncountry: ${country}`)

			// const head = xcolor ? single : colored;
			//
			// const headStates = xcolor ? singleStates : coloredStates;
			// const border = minimal ? borderless : {};
			// const table = !states
			// 	? new Table({ head, style, chars: thickBorder, colWidths: [10, 20] })
			// 	: new Table({ head: headStates, style, chars: thickBorder, colWidths: [10, 20] });
			//
			// // Display data.
			// spinner.start();
			// const lastUpdated = await getWorldwide(table, states);
			// theEnd(lastUpdated, states, minimal);
			// console.log(`states: ${states}\ncountry: ${country}`)
			// await getCountry(spinner, table, states, country).then(res => display.showTable(res));
			// await getStates(spinner, table, states, options).then(res => display.showTable(res));
			// await getCountries(spinner, table, states, country, options).then(res => display.showTable(res));


		})

	}


})();

const thickBorder = { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
			 , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
			 , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
			 , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }


async function renderData(country, states, xcolor, minimal, spinner, options) {
	const head = xcolor ? single : colored;

	const headStates = xcolor ? singleStates : coloredStates;
	const border = minimal ? borderless : {};
	const table = !states
		? new Table({ head, style, chars: thickBorder, colWidths: [10, 20] })
		: new Table({ head: headStates, style, chars: thickBorder, colWidths: [10, 20] });

	// Display data.
	spinner.start();
	const lastUpdated = await getWorldwide(table, states);
	theEnd(lastUpdated, states, minimal);
	console.log(`states: ${states}\ncountry: ${country}`)
	await getCountry(spinner, table, states, country).then(res => display.showTable(res));
	await getStates(spinner, table, states, options).then(res => display.showTable(res));
	await getCountries(spinner, table, states, country, options).then(res => display.showTable(res));

}

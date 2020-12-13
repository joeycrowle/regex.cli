#!/usr/bin/env node

/**
 * regex-gen
 * Regular expression generator
 *
 * @author Joey Crowle <https://joeycrowle.com>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const alert = require('cli-alerts');
const inquirer = require('inquirer');
const toRegex = require('to-regex');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	inquirer
	.prompt([
		{
			name: 'options',
			type: 'checkbox',
			choices: [
				'Negate',
				'Contains'
			],
			message: 'Options:'
		},
		{
			name: 'strings',
			type: 'string',
			message: 'Input strings:'
		}
	])
	.then( answers => {
		const options = answers.options;
		const stringArr = answers.strings.split(' ');
		let regexOptions = {
			negate: false,
			contains: false
		};
		if(options.includes('Negate')) regexOptions.negate = true;
		if(options.includes('Contains')) regexOptions.contains = true;
		const rgx = toRegex(stringArr, regexOptions);
		alert({type:'info', name:'Regex', msg: rgx});
	});

	debug && log(flags);
})();

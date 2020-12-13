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
const regexgen = require('regexgen');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	inquirer
	.prompt([
		{
			name: 'strings',
			type: 'string',
			message: 'Input strings:'
		}
	])
	.then( answers => {
		const stringArr = answers.strings.split(' ');
		const rgx = regexgen(stringArr);
		alert({type:'info', name:'Regex', msg: rgx});
	});

	debug && log(flags);
})();

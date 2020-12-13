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
		},
		{
			name: 'flags',
			type: 'checkbox',
			message: 'Set flags:',
			choices: [
				{
					name: 'Ignore Casing - Makes the expression search case-insensitively.',
					value: 'i',
					short: 'Ignore Casing'
				},
				{
					name: 'Global - Makes the expression search for all occurences.',
					value: 'g',
					short: 'Global'
				},
				{
					name: 'Dot All - Makes the wild character . match newlines as well.',
					value: 's',
					short: 'Dot All'
				},
				{
					name: 'Multi-line - Makes the boundary characters ^ and $ match the beginning and ending of every single line instead of the beginning and ending of the whole string.',
					value: 'm',
					short: 'Multi-Line'
				},
				{
					name: 'Sticky - Makes the expression start its searching from the index indicated in its lastIndex property.',
					value: 'y',
					short: 'Sticky'
				},
				{
					name: 'Unicode - Makes the expression assume individual characters as code points, not code units, and thus match 32-bit characters as well.',
					value: 'u',
					short: 'Unicode'
				}
			]
		}
	])
	.then( answers => {
		let flags = '';
		const f = answers.flags;
		const stringArr = answers.strings.split(' ');
		const rgx = regexgen(stringArr);
		f.forEach( value => { flags += value } );

		alert({type:'info', name:'Regex', msg: rgx+flags});
	});

	debug && log(flags);
})();

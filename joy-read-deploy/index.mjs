#! /usr/bin/env zx
import 'zx/globals';

console.log('Starting...');

await spinner('working...', () => $`sleep 1`)

console.log(chalk.blue('Hello world!'))

const homeDir = os.homedir()

console.log('homeDir:', homeDir)
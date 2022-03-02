import yargs from 'yargs/yargs'
import {hideBin} from 'yargs/helpers'
import path from 'path'
import dotenvJSON from 'dotenv-json'

import AWS from 'aws-sdk'

import {containers} from '../commands/containers'

const argv = yargs(hideBin(process.argv)).argv
const base_dir = path.resolve(process.cwd())
const env = argv.env || `${base_dir}/.env.json`

dotenvJSON({path: env})

AWS.config.update({region: process.env.CATALYSTCLOUD_REGION})

const commands = {containers}
const command = argv._[0]

if(!commands[command]) {
  console.error('usage: catalystcloud [command] [params...]')
  process.exit(1)
}

commands[command](argv)

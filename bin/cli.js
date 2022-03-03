import yargs from 'yargs/yargs'
import {hideBin} from 'yargs/helpers'
import path from 'path'
import dotenvJSON from 'dotenv-json'

import AWS from 'aws-sdk'

import {containers} from '../services/containers'

const argv = yargs(hideBin(process.argv)).argv
const base_dir = path.resolve(process.cwd())
const env = argv.env || `${base_dir}/.env.json`

dotenvJSON({path: env})

AWS.config.update({region: process.env.CATALYSTCLOUD_REGION})

const modules = {containers}
const [mod_name, fn] = argv._
if(!modules[mod_name]) {
  console.error(`${mod_name} not supported`)
  process.exit(1)
}

const mod = modules[mod_name](argv)
if(!mod[fn]) {
  console.error(`${mod_name} ${fn} not supported`)
  process.exit(1)
}

mod[fn](argv)

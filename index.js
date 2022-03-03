import AWS from 'aws-sdk'
import {containers} from './services/containers'

AWS.config.update({region: process.env.CATALYSTCLOUD_REGION})

export {containers as catalystcloud_containers}

import {readFileSync} from 'fs'
const readdirp = require('readdirp')
import path from 'path'
import mime from 'mime-types'

import {get_s3, put_objects} from '../lib/s3'

export async function containers(argv) {
  const {name: Bucket} = argv

  if(!Bucket) {
    console.error('containers requires --name')
  }

  const s3 = get_s3()

  if(argv.empty) {
    const {Contents} = await s3.listObjects({Bucket}).promise()
    return await s3
      .deleteObjects({
        Bucket,
        Delete: {Objects: Contents.map(({Key}) => ({Key}))}
      })
      .promise()
  }

  if(argv.putFile) {
    const filename = path.basename(argv.putFile)
    const file_object = {
      Key: filename,
      Body: readFileSync(argv.putFile, {
        encoding: 'utf8',
        flag: 'r'
      }),
      ContentType: mime.lookup(filename)
    }

    try {
      return await put_objects(s3, Bucket, [file_object])
    } catch(e) {
      return console.error(e)
    }
  }

  if(argv.putFiles) {
    const base_path = path.resolve(argv.putFiles)
    const file_objects = []

    for await (const {path} of readdirp(base_path)) {
      file_objects.push({
        Key: path,
        Body: readFileSync(`${base_path}/${path}`, {
          encoding: 'utf8',
          flag: 'r'
        }),
        ContentType: mime.lookup(path)
      })
    }

    try {
      return await put_objects(s3, Bucket, file_objects)
    } catch(e) {
      return console.error(e)
    }
  }

  console.error('containers supported commands: --empty, --put-files')
}

import {readdirSync, readFileSync} from 'fs'
import mime from 'mime-types'

import {get_s3} from '../lib/s3'

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

  if(argv.putFiles) {
    const filenames = readdirSync(argv.putFiles)
    const file_objects = filenames.map((filename) => ({
      Key: filename,
      Body: readFileSync(`${argv.putFiles}/${filename}`, {
        encoding: 'utf8',
        flag: 'r'
      }),
      ContentType: mime.lookup(filename)
    }))

    for(const {Key, Body, ContentType} of file_objects) {
      try {
        await s3.putObject({Bucket, Key, Body, ContentType}).promise()
        console.log(`${Bucket}: ${Key}`)
      } catch(e) {
        console.error(e)
      }
    }
  }

  console.log(argv)

  console.error('containers supported commands: --empty, --put-files')
}

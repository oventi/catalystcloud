import path from 'path'

import {get_s3, get_file_object, put_objects} from '../../lib/s3'
import {empty} from './empty'
import {put_files} from './put_files'

export function containers({container: container_url}) {
  const {s3, container_name: Bucket} = get_s3(container_url)

  return {
    empty: () => empty(s3, Bucket),
    put_files: ({folder}) => put_files(s3, Bucket, folder)
  }
}

export async function containers_old(argv) {
  if(!argv.bucket) {
    console.error('containers requires --bucket')
  }

  const {s3, bucket_name: Bucket} = get_s3(argv.bucket)

  /*
  if(argv.empty) {
    const {Contents} = await s3.listObjects({Bucket}).promise()
    if(Contents.length === 0) {
      return console.log(`${Bucket} is already empty`)
    }

    return await s3
      .deleteObjects({
        Bucket,
        Delete: {Objects: Contents.map(({Key}) => ({Key}))}
      })
      .promise()
  }

  if(argv.putFiles) {
    const base_path = path.resolve(argv.putFiles)
    const file_objects = []

    for await (const {path} of readdirp(base_path)) {
      file_objects.push(get_file_object(path, `${base_path}/${path}`))
    }

    try {
      return await put_objects(s3, Bucket, file_objects)
    } catch(e) {
      return console.error(e)
    }
  }
  */

  if(argv.putFile) {
    const filename = path.basename(argv.putFile)
    const file_object = get_file_object(filename, argv.putFile)

    try {
      return await put_objects(s3, Bucket, [file_object])
    } catch(e) {
      return console.error(e)
    }
  }

  console.error(
    'containers supported commands: --empty, --put-file, --put-files'
  )
}

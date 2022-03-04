import path from 'path'
import readdirp from 'readdirp'
import {get_file_object, put_objects} from '../../lib/s3'

export async function put_file(s3, Bucket, filepath) {
  const filename = path.basename(filepath)
  const file_object = get_file_object(filename, filepath)

  return put_objects(s3, Bucket, [file_object])
}

export async function put_files(s3, Bucket, folder) {
  const base_path = path.resolve(folder)
  const file_objects = []

  for await (const {path} of readdirp(base_path)) {
    file_objects.push(get_file_object(path, `${base_path}/${path}`))
  }

  return put_objects(s3, Bucket, file_objects)
}

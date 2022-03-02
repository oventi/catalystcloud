import {readFileSync} from 'fs'
import AWS from 'aws-sdk'
import mime from 'mime-types'

export function get_s3(bucket) {
  const {origin: endpoint, pathname} = new URL(bucket)

  const {
    CATALYSTCLOUD_ACCESS_KEY_ID: accessKeyId,
    CATALYSTCLOUD_SECRET_ACCESS_KEY: secretAccessKey
  } = process.env

  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    endpoint,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  })

  return {s3, bucket_name: pathname.substring(1)}
}

export const get_file_object = (filename, filepath) => ({
  Key: filename,
  Body: readFileSync(filepath, {encoding: 'utf8', flag: 'r'}),
  ContentType: mime.lookup(filename)
})

export async function put_objects(s3, Bucket, file_objects) {
  for(const {Key, Body, ContentType} of file_objects) {
    try {
      await s3.putObject({Bucket, Key, Body, ContentType}).promise()
      console.log(`${Bucket}: ${Key}`)
    } catch(e) {
      console.error(e)
    }
  }
}

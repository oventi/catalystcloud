import {readFileSync} from 'fs'
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import mime from 'mime-types'

export function get_s3(container_url) {
  const {origin: endpoint, pathname} = new URL(container_url)

  const {
    CATALYSTCLOUD_ACCESS_KEY_ID: accessKeyId,
    CATALYSTCLOUD_SECRET_ACCESS_KEY: secretAccessKey
  } = process.env

  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {accessKeyId, secretAccessKey},
    forcePathStyle: true,
    endpoint
  })

  return {s3, container_name: pathname.substring(1)}
}

export const get_file_object = (filename, filepath) => ({
  Key: filename,
  Body: readFileSync(filepath, {encoding: 'utf8', flag: 'r'}),
  ContentType: mime.lookup(filename)
})

export async function put_objects(s3, Bucket, file_objects) {
  for(const {Key, Body, ContentType} of file_objects) {
    try {
      await s3.send(new PutObjectCommand({Bucket, Key, Body, ContentType}))
    } catch(e) {
      console.error(e)
    }
  }
}

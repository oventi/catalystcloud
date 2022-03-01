import AWS from 'aws-sdk'

export function get_s3() {
  const {
    CATALYSTCLOUD_ACCESS_KEY_ID: accessKeyId,
    CATALYSTCLOUD_SECRET_ACCESS_KEY: secretAccessKey,
    CATALYSTCLOUD_ENDPOINT: endpoint
  } = process.env

  return new AWS.S3({
    accessKeyId,
    secretAccessKey,
    endpoint,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  })
}

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

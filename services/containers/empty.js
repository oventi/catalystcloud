import {ListObjectsCommand, DeleteObjectsCommand} from '@aws-sdk/client-s3'

export async function empty(s3, Bucket) {
  const {Contents} = await s3.send(new ListObjectsCommand({Bucket}))
  if(Contents.length === 0) {
    return false // bucket is already empty
  }

  return await s3.send(new DeleteObjectsCommand({
    Bucket,
    Delete: {Objects: Contents.map(({Key}) => ({Key}))}
  }))
}

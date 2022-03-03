import {put_objects} from '../../lib/s3'

export async function put_data(s3, Bucket, Key, Body, ContentType) {
  return put_objects(s3, Bucket, [{Key, Body, ContentType}])
}

export async function empty(s3, Bucket) {
  const {Contents} = await s3.listObjects({Bucket}).promise()
  if(Contents.length === 0) {
    // console.log(`${Bucket} is already empty`)
    return false
  }

  return await s3
    .deleteObjects({
      Bucket,
      Delete: {Objects: Contents.map(({Key}) => ({Key}))}
    })
    .promise()
}

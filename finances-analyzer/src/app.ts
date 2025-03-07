import {
  S3Client,
  S3ClientConfig,
  GetObjectCommand
} from '@aws-sdk/client-s3'

const config: S3ClientConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
}

const client = new S3Client(config)

async function getFileContent(name: string) {
  const data = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${name}.json`
  }
  const response = await client.send(new GetObjectCommand(data))
  return response.Body?.transformToString() || ''
}

getFileContent('2025').then((data) => {
  const response = JSON.parse(data)
  console.log(response)
})
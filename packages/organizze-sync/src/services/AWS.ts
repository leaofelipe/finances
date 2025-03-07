const BUCKET_NAME = process.env.AWS_BUCKET_NAME || ''

import {
  S3Client,
  PutObjectCommand,
  S3ClientConfig,
  GetObjectCommand
} from '@aws-sdk/client-s3'

const config: S3ClientConfig = {
  region: process.env.AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
}

class S3 {
  client: S3Client

  constructor() {
    this.client = new S3Client(config)
  }

  async createFile(name: string, body: string) {
    const data = {
      Bucket: BUCKET_NAME,
      Key: `${name}.json`,
      Body: body
    }
    await this.client.send(new PutObjectCommand(data))
    console.log(`File ${name}.json created.`)
  }

  async getFileContent(name: string) {
    const data = {
      Bucket: BUCKET_NAME,
      Key: `${name}.json`
    }
    const response = await this.client.send(new GetObjectCommand(data))
    return response.Body?.transformToString()
  }
}

export default new S3()

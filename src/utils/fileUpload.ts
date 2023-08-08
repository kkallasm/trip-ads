import { UploadedFile } from 'express-fileupload'
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'

export async function uploadFileToSpaces(image: UploadedFile) {
    AWS.config.update({
        region: 'fra1',
        credentials: {
            accessKeyId: process.env.SPACES_ACCESS_KEY as string,
            secretAccessKey: process.env.SPACES_SECRET_KEY as string,
        },
    })

    const s3 = new AWS.S3({
        endpoint: 'https://fra1.digitaloceanspaces.com',
    })

    const fileExt = image.name.split('.').pop()
    const imageName = uuidv4() + '.' + fileExt
    const params = {
        Bucket: 'trip-ads-spaces',
        Key: 'desktop/' + imageName,
        Body: image.data,
        ACL: 'public-read',
        ContentType: image.mimetype,
    }
    const data = await s3.upload(params).promise()

    return imageName
}

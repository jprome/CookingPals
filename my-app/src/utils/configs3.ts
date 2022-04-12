    /* AWS S3 config options */
    /* Highly recommended to declare the config object in an external file import it when needed */

    /* s3Config.ts */

    export const s3Config = {
        bucketName:  'bucket-name',
        dirName: 'directory-name',      /* Optional */
        region: 'ap-south-1',
        accessKeyId:'ABCD12EFGH3IJ4KLMNO5',
        secretAccessKey: 'a12bCde3f4+5GhIjKLm6nOpqr7stuVwxy8ZA9bC0',
        s3Url: 'https:/your-aws-s3-bucket-url/'     /* Optional */
    }

    /* End of s3Config.ts */
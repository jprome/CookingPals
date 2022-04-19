import dotenv from 'dotenv'
import S3 from 'aws-sdk/clients/s3';
import { Observable, of } from 'rxjs';
import {accessKeyId, secretAccessKey, bucket } from './s3Keys'


class FileUpload {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
export class S3Controller {

  BUCKET = bucket; // For example, 'my_bucket'.
  FOLDER = 'bucket'

  private static getS3Bucket(): any {
    return new S3(
      {
        accessKeyId:accessKeyId,
        secretAccessKey: secretAccessKey,
        region: 'us-east-1', // For example, 'us-east-1'.
        signatureVersion: 'v4'
      }
    );
  }

  public uploadFile(file:File,url:string) {
    const bucket = new S3(
      {
        accessKeyId:accessKeyId,
        secretAccessKey: secretAccessKey,
       region: 'us-east-1',
       signatureVersion: 'v4',
      }
    );

    const params = {
      Bucket: this.BUCKET,
      Key: url,
      Body: file,
      ACL: 'public-read'
    };

    bucket.upload(params, function (err:any, data:any) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

  public getFiles(): Observable<Array<FileUpload>> {
    const fileUploads:any = [];

    const params = {
      Bucket: this.BUCKET,
      Prefix: this.FOLDER
    };

    S3Controller.getS3Bucket().listObjects(params, function (err:any, data:any) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }
      console.log('Successfully get files.', data);

      const fileDetails = data.Contents;

      fileDetails.forEach((file:any) => {
        fileUploads.push(new FileUpload(
          file.Key,
          'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key
        ));
      });
    });

    return of(fileUploads);
  }

  public deleteFile(file: FileUpload) {
    const params = {
      Bucket: this.BUCKET,
      Key: file.name
    };

    S3Controller.getS3Bucket().deleteObject(params,  (err:any, data:any) => {
      if (err) {
        console.log('There was an error deleting your file: ', err.message);
        return;
      }
      console.log('Successfully deleted file.');
    });
  }
}

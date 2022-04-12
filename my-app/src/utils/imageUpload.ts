
import ReactS3Client from 'react-aws-s3-typescript'
import { s3Config } from './configs3'

const uploadFile = async (file:any) => {
       
        const s3 = new ReactS3Client(s3Config);

        const filename = 'filename-to-be-uploaded';

        try {
            const res = await s3.uploadFile(file, filename);

            console.log(res);
            
        } catch (exception) {
            console.log(exception);
           
        }
   
}

export const checkImage = (file: File) => {
        let err = ''
        if(!file) return err = "File does not exist."
      
        if(file.size > 1024 * 1024) // 1mb
          err = "The largest image size is 1mb"
      
        return err;
}

/*
export const imageUpload = async (file: File) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "jpc4kuzk")
        formData.append("cloud_name", "dcminucpx")
      
        const res = await fetch("https://api.cloudinary.com/v1_1/dcminucpx/upload", {
          method: "POST",
          body: formData
        })
      
        const data = await res.json()

        return { public_id: data.public_id, url: data.secure_url };
      }
 

*/

import ReactS3Client from 'react-aws-s3-typescript'
import { s3Config, S3Controller } from './configs3'


window.Buffer = window.Buffer || require("buffer").Buffer;

export const uploadFile = async (file:any, url:any) => {
        const s3 = new S3Controller()
        try {
            const res = await s3.uploadFile(file, url)
            console.log(res);
            
            return url 
        } catch (exception) {
            console.log(exception);
           
        }
   
}
//
// id_cookbook_cookbook-id_cover-pic
// id_cookbook_cookbook-id_recipe_recipe-id_cover-pic
// id_cookbook_cookbook-id_recipe_recipe-id_content-pics_

// id_profile_pic

const deleteFile = async (file:any) => {
       
  const s3 = new ReactS3Client(s3Config);

  const filename = 'filename-to-be-uploaded';

  try {
      const res = await s3.deleteFile("")

      console.log(res);
      
  } catch (exception) {
      console.log(exception);
     
  }

}

export const checkImage = (file: File) => {
        let err = ''
        if(!file) return err = "File does not exist."
      
        if(file.size > 1024 * 1024 * 10) // 10mb
          err = "The largest image size is 10mb"
      
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
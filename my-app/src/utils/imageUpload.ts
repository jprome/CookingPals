
import ReactS3Client from 'react-aws-s3-typescript'
import { S3Controller } from './configs3'


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
// id/cookbook_cookbook-id_cover-pic
// id/cookbook_cookbook-id_recipe_recipe-id_cover-pic
// id/cookbook_cookbook-id_recipe_recipe-id_content-pics_

// id/profile_pic

export const checkImage = (file: File) => {
        let err = ''
        if(!file) return err = "File does not exist."
      
        if(file.size > 1024 * 1024 * 10) // 10mb
          err = "The largest image size is 10mb"
      
        return err;
}


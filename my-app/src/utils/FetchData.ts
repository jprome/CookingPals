import axios from 'axios'

const base = "http://localhost:5000/api/"

export const postAPI = async (url: string, post: object, token?:string) => {
  try{
    const token_ = token ? token : '';
    const res = await axios.post(base + url, post, {
      headers: { Authorization: token_ }})
      return res;

    }catch(err){
        throw err
    }
}

export const getAPI = async (url: string, token?:string) => {
  try{
    const token_ = token ? token : '';
    const res = await axios.get(base + url, {
      headers: { Authorization: token_ }})
      
    return res;

    }
    catch(err){
      throw err
    }
}

export const getAPISendInfo = async (url: string,payload: any, token?:string) => {
  try{
    const token_ = token ? token : '';
    const res = await axios.get(base + url, 
    
      {params: payload, headers: { Authorization: token_ }}  )
    return res;
    
    }
    catch(err){
      console.log(err)
      throw err
    }
}

export const patchAPI = async (url: string, post: object, token?:string) => {
  try{
    const token_ = token ? token : '';
    const res = await axios.patch(base + url, post, {
      headers: { Authorization: token_ }})
    return res;

  }
  catch(err){
    throw err
  }
}

export const putAPI = async (url: string, post: object, token?:string) => {
  try{
    const token_ = token ? token : '';
    const res = await axios.put(base + {url}, post, {
      headers: { Authorization: token_ }})
    return res;
  }
  catch(err){
    throw err
  }
}


export const deleteAPI = async (url: string,payload: any, token?:string) => {
  try{
    const token_ = token ? token : '';
    const res = await axios.delete(base + url, 
    
      {params: payload, headers: { Authorization: token_ }}  )
    return res;
    }
    catch(err){
      throw err
    }
}
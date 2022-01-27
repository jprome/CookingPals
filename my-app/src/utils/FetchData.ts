import axios from 'axios'

const base = "http://localhost:5000/"

export const postAPI = async (url: string, post: object, token?:string) => {
    try{
        const res = await axios.post(base + url, post)
        return res;
    }catch(err){
        throw err
    }
}
export const getAPI = async (url: string, token?:string) => {
    try{
        const res = await axios.get(base + url)
        return res;
    }
    catch(err){
            throw err
    }
}

export const patchAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.patch(base + {url}, post)

  return res;
}


export const putAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.put(base + {url}, post)

  return res;
}

export const deleteAPI = async (url: string, token?:string) => {
  const res = await axios.delete(base + {url})

  return res;
}
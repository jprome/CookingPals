import { Email } from '@material-ui/icons';
import { IUserRegister } from './Typescript'

export const validRegister = (userRegister: IUserRegister) => {
  const { name, account, password } = userRegister;
  const errors: string[] = [];

  
  if(!name){
    errors.push("Please add your name.")
  }else if(name.length > 20){
    errors.push("Your name is up to 20 chars long.")
  }

  if(!account){
    errors.push("Please add your email or phone number.")
  }else if(!validPhone(account) && !validateEmail(account)){
    errors.push("Email or phone number format is incorrect.")
  }

  // location validation here

  //const msg = checkPassword(password, cf_password)
  //if(msg) errors.push(msg)

  return {
    errMsg: errors,
    errLength: errors.length
  }
}


export const checkPassword = (password: string, cf_password: string) => {
  if(password.length < 6){
    return ("Password must be at least 6 chars.")
  }else if(password !== cf_password){
    return ("Confirm password did not match.")
  }
}

export function validPhone(phone: string) {
  const re = /^[+]/g
  return re.test(phone)
}

export function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


// Shallow equality
export const shallowEqual = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if(keys1.length !== keys2.length) {
    return false;
  }

  for(let key of keys1) {
    if(object1[key] !== object2[key]){
      return false;
    }
  }
  
  return true;

}
import exp from "constants"

export interface TRegisterError {
    status?: number
    data?: {  
    errors?: {
        fullname?: string[],
        email?: string[],
        password?: string[],
      }
    }
}

export interface TLoginError {
  status?: number
  data?: {  
  error?: string
  }
}

export interface TRegisterTeacherError { 
  status?: number
  data?: {  
  error?: string
  }
}
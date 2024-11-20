
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
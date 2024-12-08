
export interface TRegister {
  fullname: string
  email: string
  password: string
  confirmPassword: string
}

export interface TLogin {
  email: string
  password: string
}

export interface TResetPass {
  token: string
  password: string
  email: string
  password_confirmation: string
}

export interface TChangePass{
  old_password:string
  new_password: string
}

export interface TResponseLogin {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

export interface TAuthState {
  isAuthenticated: boolean
  accessToken: string
  refreshToken: string | null
  expiresIn: number | null
}

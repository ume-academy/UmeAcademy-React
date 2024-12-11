type Teacher = {
  id: number
  name: string
}

export interface TInfoWithdraw {
  created_at: string
  id: number
  min_withdraw: number
  name_account: string
  name_bank: string
  number_account: number
  teacher: Teacher
  money: number
  status: number
}

export interface TInfoWithdrawRequest {
  code?: string
  created_at: string
  id: number
  teacher: {
    id: number
    name: string
    bank?: {
      id: number
      min_withdraw: number
      name_account: string
      name_bank: string
      number_account: number
    }
  }
  money: number
  status: number
}

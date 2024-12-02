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
  money:number
  status:number
}

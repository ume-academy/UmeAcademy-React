export interface TWithdrawalTransaction {
  id: number
  money: number
  teacher: {
    id: number
    name: string
  }
  status: number
  create_at: string
}

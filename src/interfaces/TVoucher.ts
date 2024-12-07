export interface TVoucher {
  id: number
  code: string | undefined
  course_id: number | null
  discount: number
  quantity: number
  start_date: any
  end_date: any
  used_count: number
  course: {
    name: string
    id: number
  }
}

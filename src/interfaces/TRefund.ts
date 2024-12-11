export interface TRefund{
  id: number; 
  course: string; 
  created_at: string; 
  money: number; 
  refund_reason: string | null; 
  status: number; 
  student: string; 
  teacher: string;
  transaction_code: string;
}
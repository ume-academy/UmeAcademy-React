import { TCourse } from "./TCourse"
import { TPaymentMethob } from "./TPaymentMethob"

type User = {
  id: number;
  name: string;
};

export interface TTransaction {
  id: number
  course: TCourse
  created_at: string
  discount_price: number
  origin_price: number
  payment_method: TPaymentMethob
  status: string
  transaction_code: string
  user: User
}

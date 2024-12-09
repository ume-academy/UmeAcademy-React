import { TCourse } from "./TCourse";
import { TPaymentMethob } from "./TPaymentMethob";
import { TUser } from "./TUser";

export interface TTransactionHistory {
  id: any;
  course: TCourse;
  created_at: string;
  discount_price: string | number;
  origin_price: string | number;
  payment_method: TPaymentMethob;
  transaction_code: string;
  user: TUser;
  status: 'success' | 'pending' | 'canceled';
}
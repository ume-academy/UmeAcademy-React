export interface TUser {
    id?: number;
    avatar: string
    fullname: string;
    email: string;
    phone: number;
    created_at:string;
    is_lock: boolean;
    bio:string
}
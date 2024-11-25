export interface TUser {
    id?: any;
    avatar: string
    fullname: string;
    email: string;
    email_verified?: boolean;
    email_verified_at?: string;
    phone: number;
    created_at:string;
    is_lock: number;
    is_teacher: boolean;
    bio:string
}
export interface TBlog {
  id: number
  title: string
  content: string
  thumbnail: string
  user:{
    email:string,
    fullname:string
  }
  status: number
  created_at:string
  category:string
}

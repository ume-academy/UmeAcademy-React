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

export interface TArticle_Form {
  title: string
  thumbnail: any
  content: string
  status: 'draft' | 'published'  
  _method?: 'PUT' 
}
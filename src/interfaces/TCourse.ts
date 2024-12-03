import { UploadFile } from "antd"
import { TCategory } from "./TCategory"
import { TLesson } from "./TLesson"
import { TLevel } from "./TLevel"
import { TTeacher } from "./TTeacher"
import { RcFile, UploadProps } from "antd/es/upload"

interface TBadges {
  badge: string | null
  category: string
}

export interface TCourse {
  id: number
  name: string
  summary: string
  thumbnail: string
  description: string | null
  video: string | null
  price: number
  duration: number
  total_lesson: number
  total_chapter: number
  total_student: number
  total_review: number
  rating: number
  status: number
  category: TCategory
  level: TLevel
  teacher: TTeacher
  badges: TBadges
  is_wishlist: boolean
  is_enrolled: boolean
  created_at: string

}

export interface TContent {
  id?: number,
  name: string,
  total_lesson: number,
  chapter_duration: number,
  lesson: TLesson[]
}

export interface TCreateCourse {
  name: string
  summary: string
  thumbnail: any
  category_id: TCategory
  level_id: TLevel
}
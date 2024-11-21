import { TLesson } from "./TLesson"

interface TCategory {
  id: number
  name: string
}

interface TLevel {
  id: number
  name: string
}

interface TTeacher {
  id: number
  fullname: string
  avatar: string | null
}

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
}

export interface TContent {
  id?: number,
  name: string,
  total_lesson: number,
  chapter_duration: number,
  lesson: TLesson[]
}
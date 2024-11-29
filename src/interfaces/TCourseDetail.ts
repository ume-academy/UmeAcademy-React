import { TCategory } from './TCategory'
import { TChapter } from './TLesson'
import { TLevel } from './TLevel'
import { TVoucher } from './TVoucher'

export interface Content {
  total_chapter: number
  total_lesson: number
  total_duration: number
  chapters: TChapter[]
}

export interface TCourseDetail {
  id: number
  name: string
  summary: string
  thumbnail: string
  description: string
  video: string
  price: number
  course_requirement: string | null
  course_learning_benefit: string | null
  content: Content
  voucher: TVoucher[]
  category: TCategory
  level: TLevel
  created_at: string
  status: number
}

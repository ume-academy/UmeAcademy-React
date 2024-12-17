import { UploadFile } from "antd"
import { is } from "date-fns/locale"

export interface TLessonByCourseID  {
  chapters: TChapter[]
}

export interface TLearningContent {
    name: string
    thumbnail: string
    total_chapter: number,
    total_lesson: number,
    total_duration: number,
    total_lesson_completed: number,
    progress: number,
    chapters: TChapter[]
}

export interface TChapter {
  id: number,
  name: string,
  total_lesson: number,
  chapter_duration: number,
  lesson_completed: number,
  lessons: TLesson[]
}

export interface TFormChapter {
  id?: number,
  name: string
}

export interface TFormLesson {
  id?: number,
  name: string,
  video_link?: string,
  video_duration?: number
  is_preview?: boolean
}

export interface TLesson {
  id: number,
  is_completed: boolean
  name: string,
  is_preview: boolean,
  video_link: string,
  video_duration: number,
  resources: any
}

export interface TLessonCompleted {
  id_Course: number,
  id_Chapter: number,
  id_Lesson: number
}

export interface TResource {
  id: number,
  name: string,
  created_at: string
}

export interface CustomUploadFile extends UploadFile {
  uid: string;
  id: string;
  url: string;
}
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

export interface TLesson {
  id: number,
  name: string,
  is_preview: boolean,
  video_link: string,
  video_duration: number
}
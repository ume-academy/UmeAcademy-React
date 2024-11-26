import { usePostCompletedLessonMutation } from '@/redux/slices/lesson/lessonApiSlice'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import 'plyr-react/plyr.css'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import './videoPlayer.scss'

interface VideoPlayerProps {
  videoURL: string
  thumbnail?: string 
  width?: number | string
  height?: number | string
  courseId: number
  chapterId: number
  lessonId: number
  isCompleted: boolean
}

const VideoPlayer = ({ videoURL, isCompleted, thumbnail, width ='100%', height = 'auto', courseId, chapterId, lessonId }: VideoPlayerProps) => {

  // Đây là hàm call api khi hoàn thành bài học
  const [postCompletedLesson] = usePostCompletedLessonMutation()

  // state này để ngăn chặn việc call api liên tục khi chạy từ 0.8= 80% đến hết video
  const [isApiCalled, setIsApiCalled] = useState(false);

  // 
  const [currentId, setCurrentId] = useState<number>(lessonId)

  // state này dùng cho việc click vào màn hình thì sẽ show icon Play/Pause được css lại
  const [showPlayPauseClick, setShowPlayPauseCLick] = useState<boolean>(true)

  // state dùng cho khi urlVideo thay đổi thì ta sẽ set cho nó thành true và sẽ tự động phát
  const [playing, setPlaying] = useState<boolean>(false) 

  // Nếu click vào màn hình thì state showPlayPauseClick sẽ thay đổi và show icon Play/Pause
  const handlePlayPauseClick = () => {
      setShowPlayPauseCLick(!showPlayPauseClick)
  }

  // playing lần đầu tiên sẽ là fasle tức là không tự động phát, nếu videoURL thay đổi thì sẽ tự động phát
  useEffect(() => {
    setPlaying(true)
  }, [videoURL])

  const handleProcess = async (processVideo: OnProgressProps) => {
    const { played } = processVideo

    // Kiểm tra nếu lessonId thay đổi, reset trạng thái gọi API
    if (currentId !== lessonId){
      // Reset trạng thái gọi API khi video thay đổi
      setCurrentId(lessonId)  

      // Cập nhật lessonId mới
      setIsApiCalled(false)
    }

    if (isCompleted === false && played >= 0.8 && !isApiCalled) {
       try {
        console.log('Bài này chưa hoàn thành call api')
        setIsApiCalled(true)
        await postCompletedLesson({id_Course: courseId, id_Chapter: chapterId, id_Lesson: lessonId}).unwrap()
        console.log('đã call xong')

       } catch (error) {
        console.log(error)
        setIsApiCalled(false)
       }
    }else if (isCompleted === true) {
      console.log('Bài này đã hoàn thành, không cần gọi API');
    }
  }

  return (
    <div className='relative flex justify-center bg-black'>
      {/* Nút Play xuất hiện khi video chưa phát */}
      {showPlayPauseClick && (
        <motion.div 
          onClick={handlePlayPauseClick}
          initial={{ opacity: 1, scale: 0.5 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1 }}
        className="absolute top-[40%] rounded-full bg-[#333] p-3 ">
          <button className='text-white flex justify-center items-center'> <CaretRightOutlined style={{fontSize: 40}} /></button>
        </motion.div>
      )}  
      
      {!showPlayPauseClick && (
        <motion.div 
          onClick={handlePlayPauseClick}
          initial={{ opacity: 1, scale: 0.5 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.5 }}
          className="absolute top-[40%] rounded-full bg-[#333] p-3 ">
          <button className='text-white flex justify-center items-center'> <PauseOutlined style={{fontSize: 40}} /></button>
        </motion.div>
      )}
      
      {/* ReactPlayer */}
      <ReactPlayer
      muted={true}
        url={videoURL}
        controls={true}
        width="100%"
        height={height}
        onPlay={() =>setShowPlayPauseCLick(false)}
        onPause={() => setShowPlayPauseCLick(true)}
        playing={playing}
        onProgress={handleProcess}
      />
    </div>
  )
}

export default VideoPlayer

import { logo2 } from '@/constants/client'
import './dotLoader.scss'

const DotLoader = () => {
  return (
    <div className='flex justify-start items-start gap-2'>
      <img src={logo2} className='dot dot1' alt='Wave 1' />
      <img src={logo2} className='dot dot2' alt='Wave 2' />
      <img src={logo2} className='dot dot3' alt='Wave 3' />
    </div>
  )
}
export default DotLoader

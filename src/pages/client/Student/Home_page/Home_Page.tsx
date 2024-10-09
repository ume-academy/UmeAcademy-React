import { Helmet } from 'react-helmet'
import FeaturedCourses from '~/components/client/student/HomeSecssion/FeaturedCourses/FeaturedCourses'
import { Introduce } from '~/components/client/student/HomeSecssion/Introduce/Introduce'
import MasterSkills from '~/components/client/student/HomeSecssion/MasterSkills/MasterSkills'
import TopCategory from '~/components/client/student/HomeSecssion/TopCategory/TopCategory'
import { getTitleTab } from '~/contants/client'


const Home_Page = () => {
  return (
    <div className=''>
      <Helmet>
        <title>{getTitleTab('')}</title>
      </Helmet>
      <Introduce />
      <TopCategory />
      <FeaturedCourses />
      <MasterSkills />
    </div>
  )
}

export default Home_Page

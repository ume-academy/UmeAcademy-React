
import { Helmet } from 'react-helmet';
import { Introduce } from '../../../Components/client/CommonComponents/HomeSecssion/Introduce/Introduce';
import { getTitleTab } from '../../../contants/client';
import FeaturedCourses from '../../../Components/client/CommonComponents/HomeSecssion/FeaturedCourses/FeaturedCourses';
import TopCategory from '../../../Components/client/CommonComponents/HomeSecssion/TopCategory/TopCategory';
import MasterSkills from '../../../Components/client/CommonComponents/HomeSecssion/MasterSkills/MasterSkills';

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

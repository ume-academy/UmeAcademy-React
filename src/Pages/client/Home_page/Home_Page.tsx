
import { Helmet } from 'react-helmet';
import { getTitleTab } from '../../../contants/client';
import { Introduce } from '../../../Components/client/CommonComponents/HomeSecssion/Introduce/Introduce';

const Home_Page = () => {
    return (
        <div className=''>
            <Helmet>
                <title>{getTitleTab('')}</title>
            </Helmet>
            <Introduce />
        </div>
    )
}

export default Home_Page

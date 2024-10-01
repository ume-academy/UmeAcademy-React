
import { Helmet } from 'react-helmet';
import { getTitleTab } from '../../../contants/client';
import { Introduce } from '../../../Components/client/CommonComponents/HomeSecssion/Introduce/Introduce';
import Card from '../../../Components/client/Card/Card';

const Home_Page = () => {
    return (
        <div className=''>
            <Helmet>
                <title>{getTitleTab('')}</title>
            </Helmet>
            <Introduce />

            <div className='container mx-auto'>
                <div className='flex flex-wrap justify-between mt-20 mb-20 '>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default Home_Page

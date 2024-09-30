
import { Helmet } from 'react-helmet';
import { getTitleTab } from '../../../contants/client';

const Home_Page = () => {
    return (
        <div>
            <Helmet>
                <title>{getTitleTab('')}</title>
            </Helmet>
        </div>
    )
}

export default Home_Page

import { Helmet } from "react-helmet"
import { getTitleTab } from "../../../contants/client"

const Dashboard_Teacher = () => {
    return (
        <>
            <Helmet>
                <title>{getTitleTab('Bảng điều khiển')}</title>
            </Helmet>

            <div className="">
                Dashboard
            </div>
        </>
    )
}

export default Dashboard_Teacher

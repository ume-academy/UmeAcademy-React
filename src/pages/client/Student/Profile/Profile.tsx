import Loading from '@/components/client/commonComponents/Loading/Loading'
import Setting from '@/components/client/commonComponents/Setting/Setting'
import { getTitleTab } from '@/constants/client'
import { useGetProfileQuery } from '@/redux/slices/profile/profileApiSlice'
import { Helmet } from 'react-helmet'

const Profile = () => {
  const { data, isLoading, isFetching } = useGetProfileQuery({})
  if (isLoading || isFetching)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loading />
      </div>
    )
  return (
    <>
      <Helmet>
        <title>{getTitleTab('Hồ sơ cá nhân')}</title>
      </Helmet>

      <div className='pt-[160px]'>
        <Setting data={data} />
      </div>
    </>
  )
}

export default Profile

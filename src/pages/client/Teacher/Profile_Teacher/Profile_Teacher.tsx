import Loading from '@/components/client/commonComponents/Loading/Loading'
import ProfileTeacher from '@/components/client/teacher/Profile/ProfileTeacher'
import { getTitleTab } from '@/constants/client'
import { useGetInfoProfileQuery } from '@/redux/slices/teacher/profile/profileTeacherApiSlice'
import { Helmet } from 'react-helmet'

const Profile_Teacher = () => {
  const { data, isFetching,isLoading } = useGetInfoProfileQuery({})
  // console.log(data)

  if (isLoading && isFetching)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loading />
      </div>
    )
  return (
    <>
      <Helmet>
        <title>{getTitleTab('Hồ sơ giảng viên')}</title>
      </Helmet>

      <div className=''>
        <ProfileTeacher props={data} />
      </div>
    </>
  )
}

export default Profile_Teacher

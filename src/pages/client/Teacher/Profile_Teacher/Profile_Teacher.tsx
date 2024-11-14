import ProfileTeacher from '@/components/client/teacher/Profile/ProfileTeacher'
import { getTitleTab } from '@/constants/client'
import { Helmet } from 'react-helmet'

const Profile_Teacher = () => {
  const user = {
    id: 1,
    fullname: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/300', // Replace with a valid URL
    email: 'nva@gmail.com',
    phone: '099999999',
    role: 'Giảng viên',
    bio: "My name's Vu. Now I'm in H-Town - Vietnam",
    socials: [
      { name: 'facebook', link: 'https://facebook.com/nva8386' },
      { name: 'youtube', link: 'https://youtube.com/nva8386' },
      { name: 'instagram', link: 'https://instagram.com/nva8386' },
    ]
  }

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Hồ sơ giảng viên')}</title>
      </Helmet>

      <div className=''>
        <ProfileTeacher props={user}/>
      </div>
    </>
  )
}

export default Profile_Teacher
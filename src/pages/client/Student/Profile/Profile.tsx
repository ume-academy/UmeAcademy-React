import Setting from '@/components/client/commonComponents/Setting/Setting'
import { getTitleTab } from '@/constants/client'
import { useGetProfileQuery } from '@/redux/slice/profile/profileApiSlice'
import { Helmet } from 'react-helmet'

const Profile = () => {
  // const user = {
  //   id: 1,
  //   fullname: 'Phạm Đào Vũ',
  //   avatar: 'https://i.pravatar.cc/300',
  //   email: 'phmvu2912@gmail.com',
  //   phone: '0987654321',
  //   bio: "My name's Vu. Now I'm in H-Town - Vietnam"
  // }

  //Chưa có đăng nhập lên lưu tạm token ở đây, Token hết hạn sau 1 tiếng
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdW1lYWNhZGVteS5tZS9hcGkvdjEvYXV0aC9sb2dpbi9lbWFpbCIsImlhdCI6MTczMjE2MzE0NiwiZXhwIjoxNzMyMTY2NzQ2LCJuYmYiOjE3MzIxNjMxNDYsImp0aSI6IlA1WGlnNk56OURDSEg2ZTYiLCJzdWIiOiIxNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.qhnKmtgIy1HIABiDaVCpgOF5T0rerhxcl2PTUcEhqww'
  localStorage.setItem('accessToken', token)

  const { data, error } = useGetProfileQuery()

  //Lỗi liên quan đến token
  console.log(error)
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

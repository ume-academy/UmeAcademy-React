import Setting from "@/components/client/CommonComponents/Setting/Setting"

const Profile = () => {
  const user = {
    id: 1,
    fullname: 'Phạm Đào Vũ',
    avatar: 'https://i.pravatar.cc/300', // Replace with a valid URL
    email: 'phmvu2912@gmail.com',
    phone: '0987654321',
    bio: "My name's Vu. Now I'm in H-Town - Vietnam"
  }

  return (
    <>
      <div className='pt-[160px]'>
        <Setting props={user} />
      </div>
    </>
  )
}

export default Profile

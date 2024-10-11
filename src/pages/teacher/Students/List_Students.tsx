import { Image, Progress, Table } from 'antd';
import styles from './listStudent.module.scss';
import './listStudents.scss'

const List_Students = () => {

  const dataUser = [
    { id: 1, name: 'Nguyễn Văn A', thumbnail: 'https://picsum.photos/id/237/300/200', email: 'nva@gmail.com', buyAt: '10/2/2024', progress: 20 },
    { id: 2, name: 'Nguyễn Văn B', thumbnail: 'https://picsum.photos/id/238/300/200', email: 'nvb@gmail.com', buyAt: '3/10/2024', progress: 10 },
    { id: 3, name: 'Nguyễn Văn C', thumbnail: 'https://picsum.photos/id/247/300/200', email: 'nvc@gmail.com', buyAt: '5/10/2024', progress: 50 },
    { id: 4, name: 'Nguyễn Văn D', thumbnail: 'https://picsum.photos/id/227/300/200', email: 'nvd@gmail.com', buyAt: '29/1/2024', progress: 60 },
    { id: 5, name: 'Nguyễn Văn E', thumbnail: 'https://picsum.photos/id/217/300/200', email: 'nve@gmail.com', buyAt: '1/5/2024', progress: 100 },
  ]

  const dataSource = dataUser.map((user, index) => (
    {
      key: index + 1,
      ...user
    }
  ))

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as const,
    },
    {
      title: 'Tên học viên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thumbnail',
      render: (_: any, item: any) => (
        <div className="">
          <Image width={120} src={item.thumbnail} />
        </div>
      ),
      align: 'center' as const,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tiến độ',
      render: (_: any, item: any) => (
        <div className="">
          <Progress type="circle" percent={item.progress} size={32}/>
        </div>
      ),
      align: 'center' as const,
    },
  ];

  return (
    <>
      <div className={`${styles['parent']} dark:border-transparent dark:bg-[#2B2838] border border-[#e9ecef] rounded-xl`}>
        <div className={`${styles['heading']} dark:text-[#b9b7c0] font-title text-2xl p-6`}>
          <h3>Danh sách học viên</h3>
        </div>

        <div className={`${styles['content']} p-6`}>
          <Table dataSource={dataSource} columns={columns} pagination={false} className='border border-[#e9ecef] rounded-lg' />
        </div>
      </div>
    </>
  )
}

export default List_Students
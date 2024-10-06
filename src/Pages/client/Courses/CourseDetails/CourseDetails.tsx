import { HeartOutlined, RollbackOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Avatar, GetProp, Menu, MenuProps, Modal, Rate } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './couseDetails.module.scss';


type MenuItem = GetProp<MenuProps, 'items'>[number];

const CourseDetails = () => {

    const [modal2Open, setModal2Open] = useState(false);
    const [currentVideoPath, setCurrentVideoPath] = useState('');

    const handlePreviewClick = (path: string) => {
        setCurrentVideoPath(path); // Cập nhật đường dẫn video hiện tại
        setModal2Open(true);
    };

    const data = [
        {
            id: 1,
            title: 'Bài 1: Giới thiệu về khóa học',
            path: 'fAAHMwa8Q1o',
            isPreview: true,
            duration: '10:00',
        },
        {
            id: 2,
            title: 'Bài 2: UI/UX là gì?',
            path: 'KtdKvSa9Uc8',
            isPreview: false,
            duration: '12:00',
        },
        {
            id: 3,
            title: 'Bài 3: Các kỹ năng cơ bản về UI/UX',
            path: 'f-hXMC13udc',
            isPreview: true,
            duration: '16:00',
        }
    ]

    const items: MenuItem[] = [
        {
            key: '1',
            label: <span className='font-subtitle text-md'>Giới thiệu chung</span>,
            children: [
                ...data.map(item => ({
                    key: item.id.toString(),
                    label: (
                        <div className={`${styles['lecture']} w-full flex justify-between items-center`}>
                            <div className="flex items-center space-x-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.7 8.98001L4.14 17.71C4.05 17.38 4 17.03 4 16.67V7.33001C4 4.25001 7.33 2.33001 10 3.87001L14.04 6.20001L18.09 8.54001C18.31 8.67001 18.52 8.81001 18.7 8.98001Z" fill="#FE893E" />
                                    <path opacity="0.4" d="M18.0897 15.46L14.0397 17.8L9.99973 20.13C8.08973 21.23 5.83973 20.57 4.71973 18.96L5.13973 18.71L19.5797 10.05C20.5797 11.85 20.0897 14.31 18.0897 15.46Z" fill="#FE893E" />
                                </svg>

                                <p className='font-subtitle'>{item.title}</p>
                            </div>

                            <div className="flex items-center space-x-6">
                                {item.isPreview && (
                                    <div className="">
                                        <p className='underline hover:text-[#f66962]' onClick={() => handlePreviewClick(item.path)}>Xem trước</p>
                                        {/* <Modal
                                            title={<p className='text-center font-subtitle dark:bg-[#2B2838] dark:text-[#B9B7C0]'>Xem trước</p>}
                                            centered
                                            open={modal2Open}
                                            // onOk={() => setModal2Open(false)}
                                            onCancel={() => setModal2Open(false)}
                                            footer={null}
                                            className=''
                                        >
                                            <div className="mt-4">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${currentVideoPath}`}
                                                    // frameborder="0"
                                                    // allowfullscreen
                                                    width={'100%'}
                                                    height={250}
                                                />
                                            </div>
                                        </Modal> */}
                                    </div>
                                )}
                                <p>{item.duration}</p>
                            </div>
                        </div>
                    ),
                })),
            ],
        },
        {
            key: '2',
            label: <span className='font-subtitle text-md'>Kỹ năng cơ bản UI/UX</span>,
            children: [
                ...data.map(item => ({
                    key: item.id.toString(),
                    label: (
                        <div className={`${styles['lecture']} w-full flex justify-between items-center`}>
                            <div className="flex items-center space-x-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.7 8.98001L4.14 17.71C4.05 17.38 4 17.03 4 16.67V7.33001C4 4.25001 7.33 2.33001 10 3.87001L14.04 6.20001L18.09 8.54001C18.31 8.67001 18.52 8.81001 18.7 8.98001Z" fill="#FE893E" />
                                    <path opacity="0.4" d="M18.0897 15.46L14.0397 17.8L9.99973 20.13C8.08973 21.23 5.83973 20.57 4.71973 18.96L5.13973 18.71L19.5797 10.05C20.5797 11.85 20.0897 14.31 18.0897 15.46Z" fill="#FE893E" />
                                </svg>

                                <p className='font-subtitle'>{item.title}</p>
                            </div>

                            <div className="flex items-center space-x-6">
                                {item.isPreview && (
                                    <div className="">
                                        <p className='underline hover:text-[#f66962]' onClick={() => handlePreviewClick(item.path)}>Xem trước</p>
                                        <Modal
                                            title={<p className='text-center font-subtitle'>Xem trước</p>}
                                            centered
                                            open={modal2Open}
                                            // onOk={() => setModal2Open(false)}
                                            onCancel={() => setModal2Open(false)}
                                        >
                                            <div className="mt-4">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${currentVideoPath}`}
                                                    // frameborder="0"
                                                    // allowfullscreen
                                                    width={'100%'}
                                                    height={250}
                                                />
                                            </div>
                                        </Modal>
                                    </div>
                                )}
                                <p>{item.duration}</p>
                            </div>
                        </div>
                    ),
                })),
            ],
        },
    ];

    return (
        <>
            <div className={`${styles['wrapper']} `}>
                <div className={`${styles['overviewTeacher']} dark:text-[#B9B7C0] pt-[160px] pb-[80px]`}>
                    <div className="container mx-auto">
                        <div className="flex flex-col">
                            <div className={`${styles['introduce']} flex justify-between items-start`}>
                                <div className="flex items-start gap-4">
                                    <div className={`${styles['avt']}`}>
                                        <Avatar size={68} src={'https://i.pravatar.cc/300'} />
                                    </div>

                                    <div className="info">
                                        <Link to={''} className='font-title text-xl text-white hover:text-[#F6694F]'>Nicole Brown</Link>
                                        <p className='text-sm'>UI/UX Designer</p>
                                    </div>

                                    <div className="rating">
                                        <Rate disabled defaultValue={4.5} />
                                    </div>
                                </div>

                                <div className={`${styles['badgeCategory']} `}>
                                    <span className='rounded-full'>LẬP TRÌNH WEB</span>
                                </div>
                            </div>

                            <div className={`${styles['introduceCourse']} my-2 space-y-3`}>
                                <div className={`${styles['title']}`}>
                                    <h2>Khóa học phát triển web hoàn chỉnh 2.0</h2>
                                </div>

                                <div className="description">
                                    <p>Học phát triển web bằng cách xây dựng 25 trang web và ứng dụng di động bằng HTML, CSS, Javascript, PHP, Python, MySQL và nhiều hơn nữa!</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12 5.30001V21.33C11.83 21.33 11.65 21.3 11.51 21.22L11.47 21.2C9.55 20.15 6.2 19.05 4.03 18.76L3.74 18.72C2.78 18.6 2 17.7 2 16.74V4.66001C2 3.47001 2.97 2.57001 4.16 2.67001C6.26 2.84001 9.44 3.90001 11.22 5.01001L11.47 5.16001C11.62 5.25001 11.81 5.30001 12 5.30001Z" fill="#F66962" />
                                            <path d="M22 4.67V16.74C22 17.7 21.22 18.6 20.26 18.72L19.93 18.76C17.75 19.05 14.39 20.16 12.47 21.22C12.34 21.3 12.18 21.33 12 21.33V5.3C12.19 5.3 12.38 5.25 12.53 5.16L12.7 5.05C14.48 3.93 17.67 2.86 19.77 2.68H19.83C21.02 2.58 22 3.47 22 4.67Z" fill="#F66962" />
                                            <path d="M7.75 9.23999H5.5C5.09 9.23999 4.75 8.89999 4.75 8.48999C4.75 8.07999 5.09 7.73999 5.5 7.73999H7.75C8.16 7.73999 8.5 8.07999 8.5 8.48999C8.5 8.89999 8.16 9.23999 7.75 9.23999Z" fill="#F66962" />
                                            <path d="M8.5 12.24H5.5C5.09 12.24 4.75 11.9 4.75 11.49C4.75 11.08 5.09 10.74 5.5 10.74H8.5C8.91 10.74 9.25 11.08 9.25 11.49C9.25 11.9 8.91 12.24 8.5 12.24Z" fill="#F66962" />
                                        </svg>

                                        <p>12+ bài học</p>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75Z" fill="#FFB54A" />
                                            <path d="M14.8896 3.45H9.10965C8.70965 3.45 8.38965 3.13 8.38965 2.73C8.38965 2.33 8.70965 2 9.10965 2H14.8896C15.2896 2 15.6096 2.32 15.6096 2.72C15.6096 3.12 15.2896 3.45 14.8896 3.45Z" fill="#FFB54A" />
                                            <path opacity="0.4" d="M15.0001 19.9699V17.0299C15.0001 15.7599 15.7601 14.9999 17.0301 14.9999H19.9701C20.1601 14.9999 20.3301 15.0199 20.5001 15.0599C20.6101 14.4999 20.6701 13.9199 20.6701 13.3299C20.6701 8.54991 16.7801 4.65991 12.0001 4.65991C7.22008 4.65991 3.33008 8.54991 3.33008 13.3299C3.33008 18.1099 7.22008 21.9999 12.0001 21.9999C13.2101 21.9999 14.3601 21.7499 15.4101 21.2999C15.1501 20.9599 15.0001 20.5199 15.0001 19.9699Z" fill="#FFB54A" />
                                            <path d="M19.97 15H17.03C15.76 15 15 15.76 15 17.03V19.97C15 21.24 15.76 22 17.03 22H19.97C21.24 22 22 21.24 22 19.97V17.03C22 15.76 21.24 15 19.97 15ZM19.69 19.46L18.51 20.14C18.27 20.28 18.03 20.35 17.81 20.35C17.64 20.35 17.49 20.31 17.35 20.23C17.03 20.04 16.85 19.67 16.85 19.18V17.82C16.85 17.33 17.03 16.96 17.35 16.77C17.67 16.58 18.08 16.62 18.51 16.86L19.69 17.54C20.11 17.79 20.35 18.13 20.35 18.5C20.35 18.87 20.12 19.21 19.69 19.46Z" fill="#FFB54A" />
                                        </svg>

                                        <p>10 giờ 56 phút 32 giây</p>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M17.53 7.77C17.46 7.76 17.39 7.76 17.32 7.77C15.77 7.72 14.54 6.45 14.54 4.89C14.54 3.3 15.83 2 17.43 2C19.02 2 20.32 3.29 20.32 4.89C20.31 6.45 19.08 7.72 17.53 7.77Z" fill="#FF875A" />
                                            <path opacity="0.4" d="M20.7896 14.7C19.6696 15.45 18.0996 15.73 16.6496 15.54C17.0296 14.72 17.2296 13.81 17.2396 12.85C17.2396 11.85 17.0196 10.9 16.5996 10.07C18.0796 9.87004 19.6496 10.15 20.7796 10.9C22.3596 11.94 22.3596 13.65 20.7896 14.7Z" fill="#FF875A" />
                                            <path opacity="0.4" d="M6.44039 7.77C6.51039 7.76 6.58039 7.76 6.65039 7.77C8.20039 7.72 9.43039 6.45 9.43039 4.89C9.43039 3.3 8.14039 2 6.54039 2C4.95039 2 3.65039 3.29 3.65039 4.89C3.66039 6.45 4.89039 7.72 6.44039 7.77Z" fill="#FF875A" />
                                            <path opacity="0.4" d="M6.55012 12.85C6.55012 13.82 6.76012 14.74 7.14012 15.57C5.73012 15.72 4.26012 15.42 3.18012 14.71C1.60012 13.66 1.60012 11.95 3.18012 10.9C4.25012 10.18 5.76012 9.88998 7.18012 10.05C6.77012 10.89 6.55012 11.84 6.55012 12.85Z" fill="#FF875A" />
                                            <path d="M12.1198 15.87C12.0398 15.86 11.9498 15.86 11.8598 15.87C10.0198 15.81 8.5498 14.3 8.5498 12.44C8.5498 10.54 10.0798 9 11.9898 9C13.8898 9 15.4298 10.54 15.4298 12.44C15.4298 14.3 13.9698 15.81 12.1198 15.87Z" fill="#FF875A" />
                                            <path d="M8.8698 17.94C7.3598 18.95 7.3598 20.61 8.8698 21.61C10.5898 22.76 13.4098 22.76 15.1298 21.61C16.6398 20.6 16.6398 18.94 15.1298 17.94C13.4198 16.79 10.5998 16.79 8.8698 17.94Z" fill="#FF875A" />
                                        </svg>


                                        <p>32 học viên đã tham gia</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto">
                    <div className={`${styles['content']} py-12 flex space-x-6`}>
                        <div className={`${styles['left']} space-y-6`}>
                            {/* Overview */}
                            <div className={`${styles['overview']} dark:bg-[#2B2838] bg-white p-6 rounded-xl space-y-4`}>
                                <div className={`${styles['heading']} dark:text-[#B9B7C0] text-[#392c7d] font-title`}>
                                    <h5>Tổng quan</h5>
                                </div>

                                {/* Mô tả khóa học */}
                                <div className={`${styles['courseDescription']} dark:text-[#B9B7C0] space-y-4`}>
                                    <h6 className='font-title'>Mô tả khóa học</h6>

                                    <div className="space-y-4">
                                        <p className='font-desc '>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                        </p>

                                        <p className='font-desc'>
                                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </p>
                                    </div>
                                </div>

                                {/* Đối tượng học viên */}
                                <div className={`${styles['courseOutcomes']} dark:text-[#B9B7C0] space-y-4`}>
                                    <h6 className='font-title'>Nhận được gì sau khi hoàn thành khóa học?</h6>

                                    <div className={`${styles['groupItems']} space-x-6`}>
                                        <div className="pl-4">
                                            <ul className='space-y-3 '>
                                                <li>Trở thành một UX designer</li>
                                                <li>Trở thành một UI designer</li>
                                                <li>Học được cách thiết kế website & ứng dụng mobile</li>
                                                <li>Có thể đưa chứng chỉ vào CV</li>
                                            </ul>
                                        </div>

                                        <div className="">
                                            <ul className='space-y-3'>
                                                <li>Trở thành một UX designer</li>
                                                <li>Trở thành một UI designer</li>
                                                <li>Học được cách thiết kế website & ứng dụng mobile</li>
                                                <li>Có thể đưa chứng chỉ vào CV</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Yêu cầu */}
                                <div className={`${styles['require']} dark:text-[#B9B7C0] space-y-4`}>
                                    <h6 className='font-title'>Yêu cầu</h6>

                                    <div className="pl-4">
                                        <ul className='space-y-3'>
                                            <li>Cần một phần mềm Adobe XD từ phiên bản 2019 trở lên. Có thể tải xuống bản dùng thử miễn phí từ Adobe.</li>
                                            <li>Không yêu cầu kinh nghiệm trong việc thiết kế trước đó.</li>
                                            <li>Không yêu cầu có kỹ năng sử dụng phần mềm Adobe XD trước đó</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Lessson */}
                            <div className={`${styles['lesson']} dark:bg-[#2B2838] bg-white p-6 rounded-xl space-y-4`}>
                                <div className={`${styles['heading']} flex justify-between items-center `}>
                                    <h5 className='font-title dark:text-[#B9B7C0] text-[#392c7d]'>Nội dung khóa học</h5>

                                    {/* Tổng số bài giảng, thời gian của khóa học */}
                                    <p className={`${styles['infoLesson']} dark:text-[#B9B7C0] text-black`}>92 bài giảng, 10:56:32</p>
                                </div>

                                <div className={`${styles['content']}`}>
                                    <Menu
                                        mode='inline'
                                        defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        items={items}
                                        className='flex flex-col space-y-3'
                                    />
                                </div>
                            </div>

                            {/* Feedback */}
                            <div className={`${styles['feedback']} dark:bg-[#2B2838] bg-white p-6 rounded-xl space-y-4`}>
                                <div className={`${styles['heading']} dark:text-[#B9B7C0] text-[#392c7d] font-title`}>
                                    <h5>Đánh giá</h5>
                                </div>

                                <div className={`${styles['content']}`}>
                                    <div className={`${styles['info']} flex justify-between items-center pb-4`}>
                                        <div className={`${styles['infoLeft']} flex items-start space-x-3`}>
                                            <div className={`${styles['avt']}`}>
                                                <Avatar size={60} src={'https://i.pravatar.cc/300'} />
                                            </div>

                                            <div className="">
                                                <div className="name font-title text-lg ">
                                                    <Link to={''} className='text-white hover:text-[#f66962]'>Nicole Brown</Link>
                                                </div>

                                                <div className="text-sm dark:text-[#B9B7C0]">
                                                    <p >UI/UX Designer</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rating">
                                            <Rate disabled defaultValue={4.5} />
                                        </div>
                                    </div>

                                    <div className={`${styles['text']}  dark:text-[#B9B7C0]`}>
                                        <p className='italic text-justify py-6'>
                                            "Đây là khóa học thứ 2 về Photoshop mà tôi đã hoàn thành cùng với Cristian. Khóa học đáng giá đến từng xu, tôi đánh giá cao chúng.
                                            Để nắm vứng khóa học này, tốt nhất bạn nên tham gia khóa học Sơ cấp đến Nâng cao về Photoshop trước. Chất lượng âm thanh và video
                                            đạt tiêu chuẩn tốt. Cảm ơn Cristian!"
                                        </p>

                                        <div className="btn">
                                            <button
                                                className='py-2 px-4 rounded-full flex items-center gap-3 dark:bg-[#131022] dark:text-[#B9B7C0] dark:border-[#B9B7C0] text-[#392C7D] '
                                            >
                                                <RollbackOutlined />
                                                Phản hồi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Post Comment */}
                            <div className={`${styles['postComment']} dark:bg-[#2B2838] bg-white p-6 rounded-xl space-y-4`}>
                                <div className={`${styles['heading']} dark:text-[#B9B7C0] text-[#392c7d] font-title`}>
                                    <h5>Viết đánh giá</h5>
                                </div>

                                <div className={`${styles['content']}`}>
                                    <form action="">
                                        <div className="flex flex-col space-y-4">
                                            <div className={`${styles['formGroup']} space-x-4`}>
                                                <input type="text" placeholder='Tên hiển thị' className='dark:bg-[#131022] bg-[#e5e5e5] dark:text-[#B9B7C0]' />

                                                <input type="email" placeholder='Email' className='dark:bg-[#131022] bg-[#e5e5e5] dark:text-[#B9B7C0]' />
                                            </div>

                                            <div className={`${styles['formGroup']}`}>
                                                <input type="text" placeholder='Subject' className='dark:bg-[#131022] bg-[#e5e5e5] dark:text-[#B9B7C0]' />
                                            </div>

                                            <div className={`${styles['formGroup']}`}>
                                                <textarea rows={5} placeholder='Viết bình luận' className='dark:bg-[#131022] bg-[#e5e5e5] dark:text-[#B9B7C0]' />
                                            </div>

                                            <div >
                                                <button className={`${styles['btn']} rounded-full py-2 px-6 dark:bg-white border-[#392c7d] `}>Đăng bình luận</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['right']} space-y-6`}>
                            <div className={`${styles['cardCourse']} dark:bg-[#2B2838] dark:text-[#B9B7C0] bg-white p-6 rounded-xl`}>
                                <div className={`${styles['media']}`}>
                                    <iframe
                                        src="https://www.youtube.com/embed/YNeOB8AqCgs?si=ZPZWCmqusEOK10_x"
                                        title="YouTube video player"
                                        // frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    >
                                    </iframe>
                                </div>

                                <div className={`${styles['act']}`}>
                                    <div className={`${styles['prices']} flex justify-between items-center`}>
                                        <h2 className={`${styles['sale']} dark:text-[#B9B7C0] text-[#159f46] my-4 font-title`}>
                                            FREE
                                        </h2>
                                        <div className={`${styles['origin']}`}>
                                            $90.00
                                        </div>
                                    </div>

                                    <div className={`${styles['btns']} space-y-3`}>
                                        {/* fav */}
                                        <div className={`${styles['btnsGroup']} space-x-4`}>
                                        <button
                                                className='
                                                rounded-full 
                                                py-2 
                                                flex 
                                                items-center 
                                                gap-1 
                                                justify-center 
                                                bg-white 
                                                text-[#f66962] 
                                                hover:text-white
                                                dark:bg-[#201d2e] 
                                                dark:text-white 
                                                hover:bg-[#d95a57] 
                                                dark:hover:bg-[#3b2b4c] 
                                                dark:hover:text-[#f66962]'
                                            >

                                                <HeartOutlined />
                                                Yêu thích
                                            </button>

                                            <button
                                                className='
                                                rounded-full 
                                                py-2 
                                                flex 
                                                items-center 
                                                gap-1 
                                                justify-center 
                                                bg-white 
                                                text-[#f66962] 
                                                hover:text-white
                                                dark:bg-[#201d2e] 
                                                dark:text-white 
                                                hover:bg-[#d95a57] 
                                                dark:hover:bg-[#3b2b4c] 
                                                dark:hover:text-[#f66962]'
                                            >
                                                <ShareAltOutlined />
                                                Chia sẻ
                                            </button>
                                        </div>

                                        <button className={`${styles['enrollBtn']} rounded-full py-2`}>
                                            Xem ngay
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles['cardIncludes']} dark:bg-[#2B2838] dark:text-[#B9B7C0] p-6 rounded-xl`}>
                                <div className={`${styles['heading']}`}>
                                    <h5 className='font-title pb-4'>Bao gồm</h5>
                                </div>

                                <div className={`${styles['items']}`}>
                                    <ul className='space-y-4'>
                                        <li>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M19.7897 4.22007C16.8297 1.27007 12.0297 1.27007 9.08966 4.22007C7.01966 6.27007 6.39966 9.22007 7.19966 11.8201L2.49966 16.5201C2.16966 16.8601 1.93966 17.5301 2.00966 18.0101L2.30966 20.1901C2.41966 20.9101 3.08966 21.5901 3.80966 21.6901L5.98966 21.9901C6.46966 22.0601 7.13966 21.8401 7.47966 21.4901L8.29966 20.6701C8.49966 20.4801 8.49966 20.1601 8.29966 19.9601L6.35966 18.0201C6.06966 17.7301 6.06966 17.2501 6.35966 16.9601C6.64966 16.6701 7.12966 16.6701 7.41966 16.9601L9.36966 18.9101C9.55966 19.1001 9.87966 19.1001 10.0697 18.9101L12.1897 16.8001C14.7797 17.6101 17.7297 16.9801 19.7897 14.9301C22.7397 11.9801 22.7397 7.17007 19.7897 4.22007ZM14.4997 12.0001C13.1197 12.0001 11.9997 10.8801 11.9997 9.50007C11.9997 8.12007 13.1197 7.00007 14.4997 7.00007C15.8797 7.00007 16.9997 8.12007 16.9997 9.50007C16.9997 10.8801 15.8797 12.0001 14.4997 12.0001Z" fill="#F66962" />
                                                <path d="M14.5 12C15.8807 12 17 10.8807 17 9.5C17 8.11929 15.8807 7 14.5 7C13.1193 7 12 8.11929 12 9.5C12 10.8807 13.1193 12 14.5 12Z" fill="#F66962" />
                                            </svg>

                                            Truy cập trọn đời
                                        </li>

                                        <li>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M16.7998 2H6.20977C3.88977 2 2.00977 3.88 2.00977 6.19V12.37V12.56C2.00977 14.88 3.88977 16.75 6.19977 16.75H9.79977C10.3498 16.75 10.7998 17.2 10.7998 17.75V18.57C10.7998 19.12 10.3498 19.57 9.79977 19.57H7.54977C7.15977 19.57 6.83977 19.89 6.83977 20.28C6.83977 20.67 7.15977 20.99 7.54977 20.99H15.4798C15.8698 20.99 16.1898 20.67 16.1898 20.28C16.1898 19.89 15.8698 19.57 15.4798 19.57H13.2298C12.6798 19.57 12.2298 19.12 12.2298 18.57V17.75C12.2298 17.2 12.6798 16.75 13.2298 16.75H16.7998C19.1198 16.75 20.9898 14.87 20.9898 12.56V12.37V6.19C20.9898 3.88 19.1098 2 16.7998 2Z" fill="#F66962" />
                                                <path d="M19.6402 9.5H14.3502C12.6202 9.5 11.9902 10.13 11.9902 11.88V19.61C11.9902 21.37 12.6102 21.99 14.3502 21.99H19.6402C21.3702 21.99 22.0002 21.36 22.0002 19.61V11.88C22.0002 10.12 21.3802 9.5 19.6402 9.5ZM17.0002 20.32C16.3902 20.32 15.9002 19.83 15.9002 19.22C15.9002 18.61 16.3902 18.12 17.0002 18.12C17.6102 18.12 18.1002 18.61 18.1002 19.22C18.1002 19.83 17.6102 20.32 17.0002 20.32Z" fill="#F66962" />
                                                <path opacity="0.4" d="M18.1004 19.2201C18.1004 19.8301 17.6104 20.3201 17.0004 20.3201C16.3904 20.3201 15.9004 19.8301 15.9004 19.2201C15.9004 18.6101 16.3904 18.1201 17.0004 18.1201C17.6104 18.1201 18.1004 18.6201 18.1004 19.2201Z" fill="#F66962" />
                                            </svg>

                                            Truy cập trên mọi nền tảng
                                        </li>

                                        <li>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M21.74 11.7401C21.13 9.74005 19.61 8.30005 17.7 7.87005C17.14 5.37005 15.6 3.58005 13.42 2.90005C11.04 2.17005 8.28 2.88005 6.55 4.69005C5.02 6.28005 4.52 8.47005 5.11 10.8001C2.98 11.3201 2 13.1801 2 14.8601C2 16.7401 3.23 18.8501 5.97 19.0401H8.5V16.4101C8.5 15.1401 9.26 14.3801 10.53 14.3801H13.47C14.74 14.3801 15.5 15.1401 15.5 16.4101V19.0401H16.31C16.32 19.0401 16.34 19.0401 16.35 19.0401C17.77 19.0401 19.13 18.5101 20.17 17.5601C21.8 16.1401 22.4 13.9101 21.74 11.7401Z" fill="#F66962" />
                                                <path d="M13.47 14.3899H10.53C9.26 14.3899 8.5 15.1499 8.5 16.4199V19.3599C8.5 20.6299 9.26 21.3899 10.53 21.3899H13.47C14.74 21.3899 15.5 20.6299 15.5 19.3599V16.4199C15.5 15.1499 14.74 14.3899 13.47 14.3899ZM13.67 18.0499L12 19.9499L11.8 20.1799C11.53 20.4899 11.3 20.4099 11.3 19.9899V18.2099H10.54C10.19 18.2099 10.1 17.9999 10.33 17.7399L12 15.8399L12.2 15.6099C12.47 15.2999 12.7 15.3799 12.7 15.7999V17.5799H13.46C13.81 17.5699 13.9 17.7899 13.67 18.0499Z" fill="#F66962" />
                                            </svg>

                                            Bài tập
                                        </li>

                                        <li>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M18.3801 12.84V17.77C18.3801 19.04 17.3901 20.4 16.2001 20.8L13.0101 21.86C12.4501 22.05 11.5401 22.05 10.9901 21.86L7.80012 20.8C6.60012 20.4 5.62012 19.04 5.62012 17.77L5.63012 12.84L10.0501 15.72C11.1301 16.43 12.9101 16.43 13.9901 15.72L18.3801 12.84Z" fill="#F66962" />
                                                <path d="M19.9795 6.46006L13.9895 2.53006C12.9095 1.82006 11.1295 1.82006 10.0495 2.53006L4.02953 6.46006C2.09953 7.71006 2.09953 10.5401 4.02953 11.8001L5.62953 12.8401L10.0495 15.7201C11.1295 16.4301 12.9095 16.4301 13.9895 15.7201L18.3795 12.8401L19.7495 11.9401V15.0001C19.7495 15.4101 20.0895 15.7501 20.4995 15.7501C20.9095 15.7501 21.2495 15.4101 21.2495 15.0001V10.0801C21.6495 8.79006 21.2395 7.29006 19.9795 6.46006Z" fill="#F66962" />
                                            </svg>
                                            Giấy chứng nhận hoàn thành khóa học
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`${styles['cardIncludes2']} dark:bg-[#2B2838] dark:text-[#B9B7C0] p-6 rounded-xl`}>
                                <div className={`${styles['heading']}`}>
                                    <h5 className='font-title pb-4'>Bao gồm</h5>
                                </div>

                                <div className={`${styles['items']}`}>
                                    <ul className='space-y-4'>
                                        <li>

                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M17.53 7.77C17.46 7.76 17.39 7.76 17.32 7.77C15.77 7.72 14.54 6.45 14.54 4.89C14.54 3.3 15.83 2 17.43 2C19.02 2 20.32 3.29 20.32 4.89C20.31 6.45 19.08 7.72 17.53 7.77Z" fill="#392C7D" />
                                                <path opacity="0.4" d="M20.7896 14.7C19.6696 15.45 18.0996 15.73 16.6496 15.54C17.0296 14.72 17.2296 13.81 17.2396 12.85C17.2396 11.85 17.0196 10.9 16.5996 10.07C18.0796 9.87004 19.6496 10.15 20.7796 10.9C22.3596 11.94 22.3596 13.65 20.7896 14.7Z" fill="#392C7D" />
                                                <path opacity="0.4" d="M6.44039 7.77C6.51039 7.76 6.58039 7.76 6.65039 7.77C8.20039 7.72 9.43039 6.45 9.43039 4.89C9.43039 3.3 8.14039 2 6.54039 2C4.95039 2 3.65039 3.29 3.65039 4.89C3.66039 6.45 4.89039 7.72 6.44039 7.77Z" fill="#392C7D" />
                                                <path opacity="0.4" d="M6.55012 12.85C6.55012 13.82 6.76012 14.74 7.14012 15.57C5.73012 15.72 4.26012 15.42 3.18012 14.71C1.60012 13.66 1.60012 11.95 3.18012 10.9C4.25012 10.18 5.76012 9.88998 7.18012 10.05C6.77012 10.89 6.55012 11.84 6.55012 12.85Z" fill="#392C7D" />
                                                <path d="M12.1198 15.87C12.0398 15.86 11.9498 15.86 11.8598 15.87C10.0198 15.81 8.5498 14.3 8.5498 12.44C8.5498 10.54 10.0798 9 11.9898 9C13.8898 9 15.4298 10.54 15.4298 12.44C15.4298 14.3 13.9698 15.81 12.1198 15.87Z" fill="#392C7D" />
                                                <path d="M8.8698 17.94C7.3598 18.95 7.3598 20.61 8.8698 21.61C10.5898 22.76 13.4098 22.76 15.1298 21.61C16.6398 20.6 16.6398 18.94 15.1298 17.94C13.4198 16.79 10.5998 16.79 8.8698 17.94Z" fill="#392C7D" />
                                            </svg>


                                            <p>Đã ghi danh: <b>32 học viên</b></p>
                                        </li>

                                        <li>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75Z" fill="#392C7D" />
                                                <path d="M14.8896 3.45H9.10965C8.70965 3.45 8.38965 3.13 8.38965 2.73C8.38965 2.33 8.70965 2 9.10965 2H14.8896C15.2896 2 15.6096 2.32 15.6096 2.72C15.6096 3.12 15.2896 3.45 14.8896 3.45Z" fill="#392C7D" />
                                                <path opacity="0.4" d="M15.0001 19.97V17.03C15.0001 15.76 15.7601 15 17.0301 15H19.9701C20.1601 15 20.3301 15.02 20.5001 15.06C20.6101 14.5 20.6701 13.92 20.6701 13.33C20.6701 8.55003 16.7801 4.66003 12.0001 4.66003C7.22008 4.66003 3.33008 8.55003 3.33008 13.33C3.33008 18.11 7.22008 22 12.0001 22C13.2101 22 14.3601 21.75 15.4101 21.3C15.1501 20.96 15.0001 20.52 15.0001 19.97Z" fill="#392C7D" />
                                                <path d="M19.97 15H17.03C15.76 15 15 15.76 15 17.03V19.97C15 21.24 15.76 22 17.03 22H19.97C21.24 22 22 21.24 22 19.97V17.03C22 15.76 21.24 15 19.97 15ZM19.69 19.46L18.51 20.14C18.27 20.28 18.03 20.35 17.81 20.35C17.64 20.35 17.49 20.31 17.35 20.23C17.03 20.04 16.85 19.67 16.85 19.18V17.82C16.85 17.33 17.03 16.96 17.35 16.77C17.67 16.58 18.08 16.62 18.51 16.86L19.69 17.54C20.11 17.79 20.35 18.13 20.35 18.5C20.35 18.87 20.12 19.21 19.69 19.46Z" fill="#392C7D" />
                                            </svg>

                                            <p>Thời lượng: <b>10 giờ 56 phút 32 giây</b></p>
                                        </li>

                                        <li>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z" fill="#392C7D" />
                                                <path d="M15.0603 19.39C14.4403 19.81 13.6603 20.16 12.7103 20.47L11.1303 20.99C7.16034 22.27 5.07034 21.2 3.78034 17.23L2.50034 13.28C1.22034 9.30998 2.28034 7.20998 6.25034 5.92998L7.83034 5.40998C8.24034 5.27998 8.63034 5.16998 9.00034 5.09998C8.70034 5.70998 8.46034 6.44998 8.26034 7.29998L7.28034 11.49C6.30034 15.67 7.59034 17.73 11.7603 18.72L13.4403 19.12C14.0203 19.26 14.5603 19.35 15.0603 19.39Z" fill="#392C7D" />
                                                <path d="M17.4904 10.51C17.4304 10.51 17.3704 10.5 17.3004 10.49L12.4504 9.26002C12.0504 9.16002 11.8104 8.75002 11.9104 8.35002C12.0104 7.95002 12.4204 7.71002 12.8204 7.81002L17.6704 9.04002C18.0704 9.14002 18.3104 9.55002 18.2104 9.95002C18.1304 10.28 17.8204 10.51 17.4904 10.51Z" fill="#392C7D" />
                                                <path d="M14.5601 13.89C14.5001 13.89 14.4401 13.88 14.3701 13.87L11.4601 13.13C11.0601 13.03 10.8201 12.62 10.9201 12.22C11.0201 11.82 11.4301 11.58 11.8301 11.68L14.7401 12.42C15.1401 12.52 15.3801 12.93 15.2801 13.33C15.2001 13.67 14.9001 13.89 14.5601 13.89Z" fill="#392C7D" />
                                            </svg>

                                            <p>Tổng số chương: <b>2</b></p>
                                        </li>

                                        <li>

                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z" fill="#392C7D" />
                                                <path d="M5.59998 8.38H4C3.45 8.38 3 8.83 3 9.38V18C3 18.55 3.45 19 4 19H5.59998C6.14998 19 6.59998 18.55 6.59998 18V9.38C6.59998 8.82 6.14998 8.38 5.59998 8.38Z" fill="#392C7D" />
                                                <path d="M12.8002 5.18994H11.2002C10.6502 5.18994 10.2002 5.63994 10.2002 6.18994V17.9999C10.2002 18.5499 10.6502 18.9999 11.2002 18.9999H12.8002C13.3502 18.9999 13.8002 18.5499 13.8002 17.9999V6.18994C13.8002 5.63994 13.3502 5.18994 12.8002 5.18994Z" fill="#392C7D" />
                                                <path d="M20.0004 2H18.4004C17.8504 2 17.4004 2.45 17.4004 3V18C17.4004 18.55 17.8504 19 18.4004 19H20.0004C20.5504 19 21.0004 18.55 21.0004 18V3C21.0004 2.45 20.5504 2 20.0004 2Z" fill="#392C7D" />
                                            </svg>

                                            <p>Cấp độ: <b>Cho người mới bắt đầu</b></p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseDetails
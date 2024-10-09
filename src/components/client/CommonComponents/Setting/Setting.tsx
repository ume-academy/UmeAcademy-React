import { CloudUploadOutlined, DeleteOutlined, EditFilled, LockFilled } from "@ant-design/icons";
import { Avatar, Tabs } from "antd";
import styles from './setting.module.scss';

const Setting = ({ props }: any) => {
    console.log(props)

    return (
        <>
            <div className="container mx-auto ">
                    <div className={`${styles['parent']} rounded-xl dark:text-[#B9B7C0] dark:border-none dark:bg-[#2B2838]`}>
                        <div className={`${styles['heading']} p-6`}>
                            <h3 className="font-title text-2xl">Cài đặt</h3>
                            <p className="font-subtitle">Bạn có toàn quyền quản lý cài đặt tài khoản của riêng mình!</p>
                        </div>

                        <div className={`${styles['content']}`}>

                            <div className="">
                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane
                                        tab={
                                            <div className="flex items-center justify-center gap-3 hover:text-[#F84563]">
                                                <EditFilled />
                                                Chỉnh sửa thông tin
                                            </div>
                                        }
                                        key="1"
                                    >
                                        {/* Nội dung tab 1 */}
                                        <div className={`${styles['tabContent']} dark:text-[#B9B7C0] `}>
                                            <div className={`${styles['info']} flex space-x-4 p-6`}>
                                                <div className="avt">
                                                    <Avatar size={120} src={props.avatar} className="border-[#F84563]"/>
                                                </div>

                                                <div className={`${styles['subContent']} space-y-4`}>
                                                    <div className="">
                                                        <h2 className="font-title text-xl">Ảnh đại diện</h2>
                                                        <p>Nên chọn ảnh có định dạng PNG, JPG hoặc JPEG và không quá 800px</p>
                                                    </div>

                                                    <div className={`${styles['act']} dark:text-[#000]  space-x-3`}>
                                                        <button>
                                                            <CloudUploadOutlined />
                                                        </button>

                                                        <button>
                                                            <DeleteOutlined />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`${styles['form']} flex space-x-4 p-6`}>
                                                <div className={`${styles['heading']} py-6`}>
                                                    <h2 className="font-title text-2xl">Thông tin cá nhân</h2>
                                                    <p>Chỉnh sửa thông tin tài khoản</p>
                                                </div>

                                                <form className={`${styles['formContent']} space-y-6`}>
                                                    <div className={`${styles['formGrid']}`}>
                                                        <div className={`${styles['formGroup']}`}>
                                                            <label>
                                                                Họ
                                                            </label>

                                                            <input
                                                                type="text"
                                                                className={`${styles['formInput']} dark:bg-[#131022]`}
                                                                value={props.fullname}
                                                            />
                                                        </div>

                                                        <div className={`${styles['formGroup']}`}>
                                                            <label>
                                                                Tên
                                                            </label>

                                                            <input type="text" className={`${styles['formInput']} dark:bg-[#131022]`} />
                                                        </div>
                                                    </div>

                                                    <div className={`${styles['formGrid']}`}>
                                                        <div className={`${styles['formGroup']}`}>
                                                            <label>
                                                                Tên hiển thị
                                                            </label>

                                                            <input type="text" className={`${styles['formInput']} dark:bg-[#131022]`} />
                                                        </div>

                                                        <div className={`${styles['formGroup']}`}>
                                                            <label>
                                                                Số điện thoại
                                                            </label>

                                                            <input type="text" className={`${styles['formInput']} dark:bg-[#131022]`} />
                                                        </div>
                                                    </div>

                                                    <div className={`${styles['formGroup']}`}>
                                                        <label>
                                                            Chức vụ
                                                        </label>

                                                        <input type="text" className={`${styles['formInput']} dark:bg-[#131022]`} />
                                                    </div>

                                                    <div className={`${styles['formGroup']}`}>
                                                        <label>
                                                            Giới thiệu
                                                        </label>

                                                        <textarea rows={5} className={`${styles['formTextarea']} dark:bg-[#131022]`} />
                                                    </div>

                                                    <div className={`${styles['btnGroup']}`}>

                                                        <button>Cập nhật thông tin</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    </Tabs.TabPane>

                                    <Tabs.TabPane
                                        tab={
                                            <div className="flex items-center justify-center gap-3 hover:text-[#F84563]">
                                                <LockFilled />
                                                Thay đổi mật khẩu
                                            </div>
                                        }
                                        key="2"
                                    >
                                        {/* Nội dung tab 2 */}
                                        <div className={`${styles['tabContent']} p-6 dark:text-[#B9B7C0]`}>
                                            <div className={`${styles['form']} flex space-x-4 p-6`}>

                                                <form className={`${styles['formContent']} space-y-6`}>
                                                    <div className={`${styles['formGroup']} w-[50%]`}>
                                                        <label>
                                                            Mật khẩu hiện tại
                                                        </label>

                                                        <input type="password" className={`${styles['formInput']} dark:bg-[#131022]`} />
                                                    </div>

                                                    <div className={`${styles['formGroup']} w-[50%]`}>
                                                        <label>
                                                            Mật khẩu mới
                                                        </label>

                                                        <input type="password" className={`${styles['formInput']} dark:bg-[#131022]`} />
                                                    </div>

                                                    <div className={`${styles['formGroup']} w-[50%]`}>
                                                        <label>
                                                            Nhâp lại mật khẩu mới
                                                        </label>

                                                        <input type="password" className={`${styles['formInput']} dark:bg-[#131022]`} />
                                                    </div>

                                                    <div className={`${styles['btnGroup']}`}>

                                                        <button>Cập nhật mật khẩu</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Setting
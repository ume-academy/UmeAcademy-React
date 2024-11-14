import { DeleteFilled, DeleteOutlined, EditFilled, UploadOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, Input, message, Modal, UploadFile } from "antd";
import Upload, { UploadProps } from "antd/es/upload/Upload";
import { ChevronRight, Plus } from "lucide-react";
import { useContext, useState } from "react";
import './Form_Lesson_Antd.scss';
import { useLocation } from "react-router-dom";
import { routerConfigAdmin } from "@/constants/admin";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";

interface Props  {
  id?: number,
}

const FormLesson = ({ id} : Props) => {
  const {theme, toggleTheme} = useContext(ThemeContext) as ThemeContextType;
  // <==== State cho Upload video===>
  const [fileList, setFileList] = useState<UploadFile[] >([])

  // Sử dụng hook để thông tin vị trí của route hiện tại render component cho phù hợp
  const location = useLocation()
  const hideCourseFunction = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  // <==== Hàm này để setFileList khi đã có video thì sẽ ẩn button upload đi ===>
  const handleUploadFile: UploadProps['onChange'] = ({file,fileList: newFileList}) => {
    setFileList(newFileList);
  }

  // State để set loading cho comfirm
  const [confirmLoading, setConfirmLoading] = useState(false);

  // <==== Xử lí logic cho xóa chương =====>
  const handleChangeDeleteChapter = (id: number) => {
    Modal.confirm({
      title: "Vui lòng xác nhận",
      content: `Bạn sắp xóa một chương trình giảng dạy. Bạn có chắc chắn muốn tiếp tục không?`,
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      onOk: () => {
        setConfirmLoading(true)
        return new Promise((resolve) => {
          setTimeout(() => {
            message.success('thành công rồi')
            // Thay bằng logic xóa của bạn
            setConfirmLoading(false); // Dừng loading
            resolve(undefined)
          }, 2000);
        });
      }
    });
  };

  // <==== Kết thúc xử lí logic cho xóa chương =====>

  // <==== Xử lí logic cho CẬP NHẬT & THÊM chương =====>
  const handleFormChapter = (id?: number) => {
    Modal.confirm({
      title: (<h2>{id ? 'Cập nhật chương học' : 'Thêm mới chương học'}</h2>),
      content: (
        <div className="flex mt-6 justify-center items-center">
          <h2 className=" mr-2">Chương:</h2>
          <Input 
            className='w-[84%] py-1 px-2 bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
            dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] text-[14px]
            focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
            value={id ? `Giới thiệu` : ''} placeholder="Vui lòng nhập tên chương"/>
        </div>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      onOk: () => {
        setConfirmLoading(true)
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('Đã xóa chương với ID:', id); // Thay bằng logic xóa của bạn
            setConfirmLoading(false); // Dừng loading
            resolve(undefined)
          }, 2000);
        });
      }
    });
  };

  // <==== Kết thúc xử lí logic cho CẬP NHẬT & THÊM chương =====>

  // <====Bắt đầu Upload ====>
  const propsUpload: UploadProps = {
    name: 'file',
    maxCount: 1,
    listType: 'text',
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  // <====Kết thúc Upload ====>

   // <==== Xử lí logic cho CẬP NHẬT & THÊM bài học =====>
   const handleFormLesson = () => {
    Modal.confirm({
      title: (<h2>Thêm mới bài học</h2>),
      content: (
        <div className="flex justify-center items-center">
          <h2 className="w-[16%]">Tên bài học:</h2>
          <Input className='w-[84%] py-1 px-2 bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
               dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] text-[14px]
              focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]' placeholder="Vui lòng nhập tên tên bài học"/>
        </div>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      onOk: () => {
        setConfirmLoading(true)
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('Đã xóa chương với ID:', id); // Thay bằng logic xóa của bạn
            setConfirmLoading(false); // Dừng loading
            resolve(undefined)
          }, 2000);
        });
      }
    });
  };

  // <==== Kết thúc xử lí logic cho CẬP NHẬT & THÊM chương =====>

  // <==== Bắt đầu collapse con ====>
  const itemNest: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex items-center dark:text-[#b9b7c0]"><h1 className="mr-4">Bài 1</h1> 
        {!hideCourseFunction && (
        <>
          {/* Modal */}
          <EditFilled onClick={() => handleFormChapter(2)} style={{fontSize: 16 ,color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, marginRight: '12px'}}/> 
          <DeleteFilled  onClick={() => handleChangeDeleteChapter(1)} style={{ fontSize: 16,height:'18px' ,color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, cursor: 'pointer'}} />
        </>
        )}
          </div>
        ),
      children: (
        <>
          <div>
            <div className={`grid  ${!hideCourseFunction ? 'grid-cols-[3fr_1fr] md:grid-cols-[4fr_1fr] lg:grid-cols-[11.5fr_0.5fr]' : 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1 place-items-center'} gap-4 w-full mb-5 min-h-6`}>
              <Upload 
                listType="picture"
                fileList={fileList}
                maxCount={1}
                onChange={handleUploadFile}
                showUploadList={{showRemoveIcon: false}}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                > 
                  {fileList.length === 0 && (
                    <button className={`${!hideCourseFunction ? 'w-[30vh] md:w-[60vh] lg:w-[760px]' : 'w-[36vh] md:w-[58vh] lg:w-[720px] '}  border-[2px] px-4 py-1 border-[#ff5364] rounded-lg text-[12px] text-[#ff5364] font-subtitle`}><UploadOutlined size={22} style={{ color: '#f66962',marginRight:8 }} />Upload</button>
                  )}
                </Upload>
              {!hideCourseFunction && (
                <DeleteOutlined onClick={() => handleChangeDeleteChapter(2)} className="flex justify-center text-[16px] items-center text-[#1f1f1f] dark:text-[#b9b7c0]" />
              )}
              <Upload
                listType="picture"
                fileList={fileList}
                maxCount={1}
                onChange={handleUploadFile}
                showUploadList={{showRemoveIcon: false}}
                {...propsUpload}>
                  {fileList.length === 0 && (
                    <button className={`${!hideCourseFunction ? 'w-[30vh] md:w-[60vh] lg:w-[760px]' : 'w-[36vh] md:w-[58vh] lg:w-[720px]'} flex items-center justify-center border-[2px] rounded-lg border-[#ff5364] text-[#ff5364] text-[12px] px-2 py-1 font-subtitle"><Plus size={12} color="#ff5364" className="mr-1`}> Tài nguyên</button>
                  )}
                </Upload>
              {!hideCourseFunction && (
                <DeleteOutlined onClick={() => handleChangeDeleteChapter(2)} className="flex justify-center text-[16px] items-center text-[#1f1f1f] dark:text-[#b9b7c0]" />
              )}
            </div>
          </div>
      </>
      ),
    }
  ]
  // <==== Kết thúc collapse con ====>

  // <==== Bắt đầu collapse cha ====>
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex items-center"><h1 className="mr-4 dark:text-[#b9b7c0]">Giới thiệu</h1> 
        {!hideCourseFunction && (
          <>
            {/* Modal */}
            <EditFilled onClick={() => handleFormChapter(2)} style={{fontSize: 16 ,color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, marginRight: '12px'}}/> 
            <DeleteFilled  onClick={() => handleChangeDeleteChapter(1)} style={{ fontSize: 16,height:'18px' ,color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, cursor: 'pointer'}} />
          </>
        )} 
        </div>
        ),
      children:(<>
        <Collapse 
          className="dark:bg-[#3a3545] dark:border-[#c7c7c740] border-[1px] border-[#d9d9d9]"
          collapsible="icon" 
          expandIcon={({isActive}) => (
          <ChevronRight strokeWidth={3} size={16}
          style={{
            fontSize: '20px' , 
            transform: `rotate(${isActive ? 270 : 90 }deg)` , 
            color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`
          }}/>
        )}
        expandIconPosition="end"
        items={itemNest}/>
        <div className="flex justify-start mt-6">
        {!hideCourseFunction && (
          <button onClick={() => handleFormLesson()} className="flex justify-center items-center mt-2 px-2 py-1.5 rounded-lg border-[1px] border-[#ff5364] bg-[#ff5364]">
            <EditFilled  style={{fontSize: 12 ,color: "#fff", marginRight: '12px'}}/> 
            <p className="text-[#fff] text-[12px] font-title ">Thêm bài học mới</p>
          </button>  
        )}
        </div>          
      </>),
    }]

  // <==== Kết thúc collapse cha ====>

  return (
    <div className={` ${hideCourseFunction ? 'px-[16px]' : 'px-[16px]'}`}>
      <div className='shadow-[0_2px_4px_rgba(0,0,0,0.08),_0_4px_12px_rgba(0,0,0,0.16)] rounded-lg p-[16px] lg:p-14 min-h-[460px] flex flex-col justify-between bg-[#fff] dark:bg-[#2b2838]'>
        <h4 className='text-[28px] font-title text-[#f66962] mb-6'>Chương trình giảng dạy</h4>
        <div className="flex-grow">
          <Collapse
              className="dark:bg-[#3a3545] dark:border-[#c7c7c740] border-[1px] border-[#d9d9d9]"
              expandIcon={({isActive}) => (
                <ChevronRight strokeWidth={3} size={16} style={{ transform: `rotate(${isActive ? 270 : 90 }deg)` , fontSize: '20px' , color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`}}/>
              )}
              collapsible="icon" 
              expandIconPosition="end" 
              items={items} 
              defaultActiveKey={['1']} 
               />       
        </div>
        
        {!hideCourseFunction && (
        <div className="flex justify-end mt-12">
            <button onClick={() => handleFormChapter()} className=" w-[180px] border-[1px] font-title border-[#ff5364] bg-[#ff5364] text-[#fff] p-2.5 rounded-lg hover:bg-transparent hover:text-[#ff5364]">thêm phần</button>
        </div> 
        )}
    </div>
    </div>
  );
}

export default FormLesson;

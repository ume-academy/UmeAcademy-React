import { DeleteFilled, DeleteOutlined, EditFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Input, message, Modal } from "antd";
import Upload, { UploadProps } from "antd/es/upload/Upload";
import { ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import  './Form_Lesson_Antd.scss'
interface Props  {
  theme : 'dark' | 'light',
  id?: number,
  
}

const FormLesson = ({theme, id} : Props) => {
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
          <EditFilled onClick={() => handleFormChapter(2)} style={{fontSize: 16 ,color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, marginRight: '12px'}}/> 
          
        {/* Modal */}
        <DeleteFilled  onClick={() => handleChangeDeleteChapter(1)} style={{ fontSize: 16,height:'18px' ,color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, cursor: 'pointer'}} />
        </div>
        ),
      children: (
        <>
          <div>
            <div className="grid grid-cols-[11.5fr_0.5fr] gap-4 w-full mb-5">
              <input
                className="flex w-full rounded-md border-[1px] border-[#d9d9d9] dark:border-[#c7c7c740] h-[40px] bg-white dark:bg-[#212529]  text-sm text-gray-400 file:h-[100%] file:mr-2 file:border-0 file:bg-[#ebf0f5] dark:file:bg-[#2b3035] file:text-[#000000E0] dark:file:text-[#b9b7c0] file:text-[12px] file:font-desc file:text-sm "
                type="file"
              />
              <DeleteOutlined onClick={() => handleChangeDeleteChapter(2)} className="flex justify-center text-[16px] items-center text-[#1f1f1f] dark:text-[#b9b7c0]" />
            </div>
            <Upload {...propsUpload}>
              <button className="flex items-center justify-center border-[2px] rounded-lg border-[#ff5364] text-[#ff5364] text-[12px] px-2 py-1 font-subtitle"><Plus size={12} color="#ff5364" className="mr-1" /> Tài nguyên</button>
            </Upload>
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
          <EditFilled onClick={() => handleFormChapter(2)} style={{fontSize: 16 ,color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, marginRight: '12px'}}/> 
          
        {/* Modal */}
        <DeleteFilled  onClick={() => handleChangeDeleteChapter(1)} style={{ fontSize: 16,height:'18px' ,color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, cursor: 'pointer'}} />
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
          <button onClick={() => handleFormLesson()} className="flex justify-center items-center mt-2 px-2 py-1.5 rounded-lg border-[1px] border-[#ff5364] bg-[#ff5364]">
            <EditFilled  style={{fontSize: 12 ,color: "#fff", marginRight: '12px'}}/> 
            <p className="text-[#fff] text-[12px] font-title ">Thêm bài học mới</p>
          </button>  
        </div>          
      </>),
    }]

  // <==== Kết thúc collapse cha ====>

  return (
    <div className='shadow-[0_2px_4px_rgba(0,0,0,0.08),_0_4px_12px_rgba(0,0,0,0.16)] rounded-lg py-12 px-14 min-h-[460px] flex flex-col justify-between dark:bg-[#2b2838]'>
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
        
        <div className="flex justify-end mt-12">
            <button onClick={() => handleFormChapter()} className=" w-[180px] border-[1px] font-title border-[#ff5364] bg-[#ff5364] text-[#fff] p-2.5 rounded-lg hover:bg-transparent hover:text-[#ff5364]">thêm phần</button>
        </div> 
    </div>
  );
}

export default FormLesson;

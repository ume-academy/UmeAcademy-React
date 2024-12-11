// FormChapter.tsx
import { routerConfigAdmin } from "@/constants/admin";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";
import useLoading from "@/hooks/useLoading";
import { TCourseDetail } from "@/interfaces/TCourseDetail";
import { TChapter, TFormChapter } from "@/interfaces/TLesson";
import { useCreateChapterMutation, useUpdateChapterMutation } from "@/redux/slices/chapter/chapterApiSlice";
import { EditFilled } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Form, Input, InputRef, message, Modal } from "antd";
import { ChevronRight } from "lucide-react";
import React, { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./Form_Lesson_Antd.scss";
import Form_Lesson from "./FormLesson/Form_Lesson";

interface ChapterProps {
  courseData: TCourseDetail
  isRefetch: () => void 
}

const FormChapter = ({courseData, isRefetch} : ChapterProps) => {
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const  {startLoading, loading, stopLoading} = useLoading()
  const [form] = Form.useForm();
  const {id} = useParams()
  const id_Course = id
  const [createChapter] = useCreateChapterMutation()
  const [updateChapter] = useUpdateChapterMutation()

  const [isHovered, setIsHovered] = useState(false);

  // Hàm xử lý sự kiện hover button submit
  const handleMouseEnter = () => {
    setIsHovered(true); // Cập nhật state khi hover vào
  };

  // Hàm xử lý sự kiện hover button submit
  const handleMouseLeave = () => {
    setIsHovered(false); // Cập nhật state khi rời khỏi
  };

  const location = useLocation();
  const hideCourseFunction = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(":id", "[^/]+")}$`);
    return regex.test(location.pathname);
  });

  const handleSubmitChapter = async (chapter?: TFormChapter) => {
    startLoading()
    try {
      if(chapter?.id){
        console.log(chapter?.id, chapter?.name)
        await updateChapter({id_course: Number(id_Course), id_chapter: chapter?.id, name: chapter?.name}).unwrap()
      }else{
        if(chapter?.name){
          await createChapter({id_course: Number(id_Course), name: chapter?.name}).unwrap()
        }
      }
      isRefetch()
      message.success(chapter?.id ? 'Cập nhật chương học thành công' : 'Thêm mới chương học thành công')
      stopLoading()
    } catch (error) {
      console.log('lỗi rồi', error)
      message.error(chapter?.id ? 'Cập nhật chương học thất bại' : 'Thêm mới chương học thất bại')
      stopLoading()
    }
  }

  // <==== Xử lí logic cho CẬP NHẬT & THÊM chương =====>
  const handleFormChapter = (chapter?: TFormChapter) => {
    let inputRef = React.createRef<InputRef>() // Tạo ref lấy giá trị từ input
    Modal.confirm({
      title: (<h2>{chapter?.id ? 'Cập nhật chương học' : 'Thêm mới chương học'}</h2>),
      content: (
        <div className="flex mt-6 justify-center items-center w-full">
          <Form layout="vertical" className="w-full" form={form} onFinish={handleSubmitChapter}>
          <Form.Item
            name='name'
            label={<h2 className=" mr-2">Chương học:</h2>}
            rules={[{ required: true}]}
          >
            <Input 
              ref={inputRef}
              className=' py-1 px-2 bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
              dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] text-[14px]
              focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
              defaultValue={chapter?.id ? `${chapter.name}` : ''} placeholder="Vui lòng nhập tên chương"
              />
            </Form.Item>
          </Form>
        </div>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      onCancel: () => {form.resetFields()},
      onOk:  async () => {
        try {
          // Validate form
          const values = await form.validateFields();
          const inputValue = values.name;
          handleSubmitChapter({ id: chapter?.id, name: inputValue });
        } catch (error) {
          console.log('Validation failed:', error);
          message.error('Vui lòng điền đầy đủ thông tin');
        }finally{
          form.resetFields()
        }
      },
    });
  };

  // <==== Kết thúc xử lí logic cho CẬP NHẬT & THÊM chương =====>

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
        // setConfirmLoading(true)
        // return new Promise((resolve) => {
        //   setTimeout(() => {
        //     message.success('thành công rồi')
        //     // Thay bằng logic xóa của bạn
        //     setConfirmLoading(false); // Dừng loading
        //     resolve(undefined)
        //   }, 2000);
        // });
      }
    });
  };

  // <==== Kết thúc xử lí logic cho xóa chương =====>


  // <==== Bắt đầu collapse cha ====>
  const listChapter = (chapter: TChapter, index: number) : CollapseProps['items'] => [
    {
      key:`${chapter.id}`,
      label: (
        <div className="flex items-center font-subtitle"><h1 className="mr-1 dark:text-[#b9b7c0]">Chương {index + 1}:</h1><h1 className="mr-4 dark:text-[#b9b7c0]">{chapter.name}</h1> 
        {!hideCourseFunction && (
          <>
            {/* Modal */}
            <EditFilled onClick={() => handleFormChapter({id: chapter?.id, name: chapter.name})} style={{fontSize: 16 ,color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, marginRight: '12px'}}/> 
            {/* <DeleteFilled  onClick={() => handleChangeDeleteChapter(1)} style={{ fontSize: 16,height:'18px' ,color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, cursor: 'pointer'}} /> */}
          </>
        )} 
        </div>
        ),
      children: !hideCourseFunction && chapter.lessons === null ? (<h1>Chưa có bài học nào</h1>) : (<><Form_Lesson hideCourseFunction={hideCourseFunction} chapter={chapter} isRefetch={isRefetch}/></>),
    }]

  // <==== Kết thúc collapse cha ====>

  return (
    <div className={` ${hideCourseFunction ? 'px-[16px]' : 'px-[16px]'}`}>
      <div className='shadow-[0_2px_4px_rgba(0,0,0,0.08),_0_4px_12px_rgba(0,0,0,0.16)] rounded-lg p-[16px] lg:p-14 min-h-[460px] flex flex-col justify-between bg-[#fff] dark:bg-[#2b2838]'>
        <h4 className='text-[28px] font-title text-[#f66962] mb-6'>Chương trình giảng dạy</h4>
        <div className="flex-grow ">
          {courseData.content.chapters.map((chapter, index) => (
            <Collapse
              key={chapter.id}
              className="dark:bg-[#3a3545] dark:border-[#c7c7c740] border-[1px] border-[#d9d9d9] mb-5"
              expandIcon={({isActive}) => (
                <ChevronRight strokeWidth={3} size={16} style={{ transform: `rotate(${isActive ? 270 : 90 }deg)` , fontSize: '20px' , color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`}}/>
              )}
              collapsible="icon" 
              expandIconPosition="end" 
              items={listChapter(chapter,index)}  // truyền chapter vào đây 
              // defaultActiveKey={['1']} 
               />  
              ))}
        </div>

        {!hideCourseFunction && (
        <div className="flex justify-end mt-12">
            <Button 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{border: '2px solid #ff5364', color: `${isHovered === false ? '#fff' : '#ff5364'}` }}
              className='w-full md:w-[180px] lg:w-[180px] font-title bg-[#ff5364] text-[#fff] p-5 rounded-lg hover:bg-transparent'
              disabled={loading}
              onClick={() => handleFormChapter()}
            >
              Tạo chương mới
            </Button>
        </div> 
        )}
    </div>
    </div>
  );
};

export default FormChapter;

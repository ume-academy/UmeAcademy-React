import { UploadFile } from "antd";

type FileType = UploadFile<any>;  // Định nghĩa kiểu dữ liệu cho file tải lên, dựa trên kiểu UploadFile có sẵn trong Ant Design

// Hàm getBase64 chuyển file hình ảnh thành base64 để hiển thị trên UI
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));  // Sau khi đọc file, gọi callback với base64
  reader.readAsDataURL(img.originFileObj as File);  // Đọc file ảnh thành base64
};

// Hàm kiểm tra định dạng và kích thước của file trước khi tải lên
const beforeUpload = (file: FileType) => {
  // Lấy đối tượng file gốc từ originFileObj
  const fileObj = file.originFileObj as File;

  // Kiểm tra file có phải là ảnh JPG hoặc PNG hay không
  const isJpgOrPng =   fileObj.type === 'image/jpeg' 
                    || fileObj.type === 'image/png';
  // Kiểm tra kích thước file có nhỏ hơn 2MB hay không
  const isLt2M = fileObj.size / 1024 / 1024 < 2;
  
  if (!isJpgOrPng) {
    return Promise.reject('You can only upload JPG/PNG file!');  // Nếu không phải JPG hoặc PNG thì trả về lỗi
  }

  if (!isLt2M) {
    return Promise.reject('Image must smaller than 2MB!');  // Nếu file lớn hơn 2MB thì trả về lỗi
  }
  
  return Promise.resolve();  // Nếu không có lỗi, cho phép tải lên
};

export { getBase64, beforeUpload };  // Xuất hàm getBase64 và beforeUpload để sử dụng ở các component khác
import { GetProp, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export const validateThumbnail = async (file: FileType, isUsingOldThumbnail: boolean) => {

  // Nếu đang sử dụng ảnh cũ, bỏ qua validate
  if (isUsingOldThumbnail) {
    return Promise.resolve();
  }

  if(!file ) return Promise.reject('Vui lòng chọn file');

  const isFileize = file.size / 1024 / 1024 < 2;
  if(!isFileize ) return Promise.reject('File phải nhỏ hơn 2MB');

  const isFileFormat = file.type === 'image/jpeg'
                    || file.type === 'image/png'
                    || file.type === 'image/jpg'
                    || file.type === 'image/gif'
                    || file.type === 'image/svg'
    
  if(!isFileFormat) return Promise.reject('File không đúng định dạng');

  return Promise.resolve();
}

export const validateVideo = async (file: FileType) => {
  
  if(!file) return Promise.resolve()

  const isFileize = file.size / 1024 / 1024 < 10;
  if(!isFileize) return Promise.reject('Video phải nhỏ hơn 10MB');

  const isFileFormat = file.type === 'video/mp4'
                    || file.type === 'video/mpeg'
                    || file.type === 'video/avi'
    
  if(!isFileFormat) return Promise.reject('Video không đúng định dạng');

  return Promise.resolve();
}


export const validatePrice = (value: number) => {
  if (value === undefined || value >= 0) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Giá tiền không hợp lệ'));
  }
} 
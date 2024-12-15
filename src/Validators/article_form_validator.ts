import { GetProp, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export const validateThumbnailArticle = async (file: FileType, isUsingOldThumbnail: boolean) => {

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
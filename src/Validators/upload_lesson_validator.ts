import { message, UploadFile } from 'antd';

const allowedFileTypes = ['video/mp4', 'video/mpeg', 'video/x-msvideo']; // MP4, MPEG, AVI
const maxFileSizeMB = 10; // Giới hạn kích thước file 10MB

export const validateVideoFile = (file: File): boolean => {
  const isValidType = allowedFileTypes.includes(file.type);
  const isValidSize = file.size / 1024 / 1024 <= maxFileSizeMB;

  if (!isValidType) {
    message.error('Chỉ được upload định dạng MP4, MPEG, AVI.');
    return false;
  }

  // if (!isValidSize) {
  //   message.error(`Dung lượng file không được vượt quá ${maxFileSizeMB}MB.`);
  //   return false;
  // }

  return true;
};

const maxResourceFileSizeMB = 200; // Giới hạn kích thước file 200MB

export const validateResourceFile = (file: File | UploadFile | null): boolean => {
  if (!file) {
    message.error('Vui lòng chọn một file hợp lệ.');
    return false;
  }

  const fileSize =
    file.size ??
    (file as UploadFile)?.originFileObj?.size ??
    0;

  if (!fileSize || fileSize === 0) {
    message.error('Không thể xác định kích thước file.');
    return false;
  }

  const isValidSize = fileSize / 1024 / 1024 <= maxResourceFileSizeMB;
  if (!isValidSize) {
    message.error(`Dung lượng file không được vượt quá ${maxResourceFileSizeMB}MB.`);
    return false;
  }

  return true;
};
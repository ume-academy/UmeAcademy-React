import { message } from 'antd';

const allowedFileTypes = ['video/mp4', 'video/mpeg', 'video/x-msvideo']; // MP4, MPEG, AVI
const maxFileSizeMB = 10; // Giới hạn kích thước file 10MB

export const validateVideoFile = (file: File): boolean => {
  const isValidType = allowedFileTypes.includes(file.type);
  const isValidSize = file.size / 1024 / 1024 <= maxFileSizeMB;

  if (!isValidType) {
    message.error('Chỉ được upload định dạng MP4, MPEG, AVI.');
    return false;
  }

  if (!isValidSize) {
    message.error(`Dung lượng file không được vượt quá ${maxFileSizeMB}MB.`);
    return false;
  }

  return true;
};
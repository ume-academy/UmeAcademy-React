
import { number } from 'echarts';

export const validateDiscount = (value: number) => {
  if (!value) {
    return Promise.reject("Phần trăm là bắt buộc");
  }
  
  // Chuyển giá trị về số và kiểm tra nếu nó là một số
  const numberValue = Number(value);
  
  if (isNaN(numberValue)) {
    return Promise.reject("Phần trăm phải là số");
  }
  
  // Kiểm tra số nguyên và lớn hơn 0
  if (!Number.isInteger(numberValue) || numberValue <= 0) {
    return Promise.reject("Phần trăm phải là số nguyên dương");
  }
  
  // Kiểm tra giá trị trong khoảng 1 đến 100
  if (numberValue < 1 || numberValue > 100) {
    return Promise.reject("Giảm giá phải trong khoảng 1 đến 100");
  }
  
  return Promise.resolve();
}

export const validateQuantity = (value: number) => {
  if (!value) {
    return Promise.reject("Số lượng là bắt buộc");
  }

  const numberValue = Number(value);

  if (isNaN(numberValue)) {
    return Promise.reject("Phần trăm phải là số");
  }

  if (!Number.isInteger(numberValue) || numberValue <= 0) {
    return Promise.reject("Số lượng phải là số nguyên dương");
  }

  if (numberValue < 1) {
    return Promise.reject("Số lượng phải lớn hơn hoặc bằng 1");
  }

  return Promise.resolve();
}
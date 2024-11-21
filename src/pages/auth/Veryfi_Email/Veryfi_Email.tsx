import { router } from '@/configs/routes';
import React from 'react';
import { Link } from 'react-router-dom';

const Veryfi_Email = () => {
  return (
    <div className='w-full flex justify-center items-center h-screen'>
        <div className="bg-yellow-300 w-[600px] p-8 rounded-lg mb-28">
          <h1 className='text-center text-[#3A3A3A] text-[28px] font-title mb-6'>Vui lòng xác minh email</h1>
          <p className="text-lg mb-8">Chúng tôi đã gửi một liên kết xác minh đến email của bạn. Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.</p>
          <Link to={router.login} className='flex justify-center '>
            Đăng nhập ngay
          </Link>
        </div>
    </div>
  );
}

export default Veryfi_Email;

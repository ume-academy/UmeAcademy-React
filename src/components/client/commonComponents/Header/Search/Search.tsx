import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, TreeSelect } from 'antd';
import React from 'react';

const Search = () => {

  return (
    <div>
      <form action='/search' className='flex justify-between bg-white p-2 mb-6 lg:mb-0 rounded-full dark:bg-[#3d3a4e]'>
        <SearchOutlined style={{ color: '#f66962', marginRight: 10, paddingLeft: 10 }} />
        <Input
          type='text'
          className='bg-transparent border-none lg:w-[500px] focus:border-transparent mr-2 placeholder:text-[#b9b7c0] 
                    text-[#b9b7c0] hover:bg-transparent focus:bg-transparent'
          placeholder='Tìm kiến khóa học, giảng viên,'
        />

        <button type='submit' className='bg-[#f66962] rounded-full w-[40px] md:w-[38px] lg:w-[32px] hover:bg-[#fc7f50]'>
          <ArrowRightOutlined style={{ color: 'white' }} />
        </button>
      </form>
    </div>
  );
}

export default Search;

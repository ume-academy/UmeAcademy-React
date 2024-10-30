import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, TreeSelect } from 'antd';
import React from 'react';

const Search = () => {
  const treeData = [
    {
      value: 'parent 1',
      title: 'parent 1'
    },
    {
      value: 'parent 2',
      title: 'parent 2'
    },
    {
      value: 'parent 3',
      title: 'parent 3'
    }
  ]
  return (
    <div>
      <div className='flex justify-between bg-white p-2 rounded-full dark:bg-[#3d3a4e]'>
                  <SearchOutlined style={{ color: '#f66962', marginRight: 10, paddingLeft: 10 }} />
                  <Input
                    type='text'
                    className='bg-transparent border-none w-[360px] focus:border-transparent mr-2 placeholder:text-[#b9b7c0] 
                    text-[#b9b7c0] hover:bg-transparent focus:bg-transparent'
                    placeholder='Tìm kiến khóa học, giảng viên,'
                  />
                  <TreeSelect
                    treeData={treeData}
                    className='bg-transparent max-w-[174px] mr-2 custom'
                    style={{ height: '32px' }}
                    dropdownClassName='custom-dropdown'
                    defaultValue={'-- Vui lòng chọn'}
                  />
                  <button className='bg-[#f66962] rounded-full w-[32px] hover:bg-[#fc7f50]'>
                    <ArrowRightOutlined style={{ color: 'white' }} />
                  </button>
                </div>
    </div>
  );
}

export default Search;

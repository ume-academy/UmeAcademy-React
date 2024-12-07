import Card_Horizontal from '@/components/client/commonComponents/Card/Card_Horizontal'
import { smoothScrollToTop } from '@/constants/utils'
import useLoading from '@/hooks/useLoading'
import { TCategory } from '@/interfaces/TCategory'
import { TCourse } from '@/interfaces/TCourse'
import { TLevel } from '@/interfaces/TLevel'
import { useGetAllCategoryQuery } from '@/redux/slices/category/categoryApiSlice'
import { useGetAlllevelQuery } from '@/redux/slices/level/levelApiSlice'
import { useSearchCourseQuery } from '@/redux/slices/course/searchCourseApiSlice'
import { Checkbox, Drawer, Form, Input, Pagination, Rate } from 'antd'
import { Filter, MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const CustomInput = styled(Input)`
  border: 1px solid #b4a7f5 !important;
  box-shadow: none !important;
`

const Search = () => {
  const location = useLocation()
  const queryURL = new URLSearchParams(location.search)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: categoriesData } = useGetAllCategoryQuery({})
  const { data: levelsData } = useGetAlllevelQuery({})
  const [price, setPrice] = useState(0)
  const [rating, setRating] = useState(0)
  const nav = useNavigate()
  const perPage = 12
  const { loading } = useLoading()

  const [filter, setFilter] = useState({
    name: queryURL.get('name'),
    price: price,
    categories: queryURL.get('category'),
    levels: queryURL.get('level'),
    rating: rating,
    per_page: perPage,
    page: currentPage
  })

  const { data, refetch } = useSearchCourseQuery(filter)

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    const updatedFilter = {
      name: queryURL.get('name') || '',
      price: Number(queryURL.get('price')) || 0,
      categories: queryURL.get('categories') || '',
      levels: queryURL.get('levels') || '',
      rating: Number(queryURL.get('rating')) || 0,
      per_page: perPage,
      page: Number(queryURL.get('page')) || 1
    }
    setFilter(updatedFilter)
  }, [location.search])

  const updateQueryParams = (key: string, value: string) => {
    queryURL.set(key, value)
    nav(`?${queryURL.toString()}`)
  }

  const updateFilter = (key: string, value: any) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
      page: 1
    }))
    updateQueryParams(key, value.toString())
  }

  const handlePrice = () => {
    updateFilter('price', price)
  }

  const handleCategory = (categories: string) => {
    updateFilter('categories', categories)
  }

  const handleLevel = (levels: string) => {
    updateFilter('levels', levels)
  }

  const handleRating = (ratingValue: number) => {
    setRating(ratingValue)
    updateFilter('rating', ratingValue)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateFilter('page', page)
    smoothScrollToTop()
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className='py-[160px] max-w-[1280px] mx-auto px-4 lg:px-0'>
      <div className='flex flex-col-reverse lg:flex-row gap-8 md:gap-6 '>
        <div className='left w-full lg:w-[70%] space-y-4'>
          <div className='flex justify-between'>
            {filter.name && (
              <h5 className='font-title text-[16px] md:text-xl dark:text-[#B9B7C0] pt-2'>
                Kết quả tìm kiếm cho: <span>"{filter.name}"</span>
              </h5>
            )}
            <div onClick={toggleMenu} className='lg:hidden p-2 flex justify-between items-center'>
              <MenuIcon size={30} />
            </div>
          </div>

          {loading ? (
            <div></div>
          ) : data?.data.length > 0 ? (
            <div>
              <div className='space-y-4 md:space-y-6'>
                {data?.data.map((course: TCourse) => <Card_Horizontal key={course.id} {...course} />)}
              </div>
              <div className='flex justify-end mt-10'>
                <Pagination
                  current={currentPage}
                  total={data?.meta?.total}
                  pageSize={perPage}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <div className=''>Không tìm thấy khóa học</div>
          )}
        </div>

        <div className='lg:hidden left-30 absolute'>
          <Drawer
            title={
              <div className='text-lg font-semibold flex items-center gap-1'>
                <Filter size={24} />
                <h5 className='font-title text-[16px] md:text-xl '>Bộ lọc</h5>
              </div>
            }
            placement='left'
            closable={true}
            onClose={() => setIsMenuOpen(false)}
            open={isMenuOpen}
          >
            <div className='space-y-6'>
              <div className='p-4 border border-grey-200 rounded-md text-[16px] md:text-lg'>
                <div className='font-semibold dark:text-[#B9B7C0]'>Nhập giá tiền bạn muốn tìm</div>
                <div className='checkboxs py-4 space-y-2'>
                  <Form.Item name='disabled' valuePropName='keny-white'>
                    <div className='w-full flex justify-between'>
                      <CustomInput
                        allowClear
                        onChange={(e) => setPrice(Number(e.target.value))}
                        placeholder='đ'
                        className='w-[72%] py-1 px-2 border rounded-[4px] '
                      />
                      <button onClick={handlePrice} type='submit' className='bg-[#b4a7f5] py-1 px-3 rounded-[4px]'>
                        Tìm kiếm
                      </button>
                    </div>
                  </Form.Item>
                </div>
              </div>
              <div className='p-4 border border-grey-200 rounded-md text-[16px] md:text-lg'>
                <div className='flex justify-between items-center font-semibold dark:text-[#B9B7C0]'>
                  <p>Danh mục khóa học</p>
                  <button onClick={() => handleCategory('')}>Đặt lại</button>
                </div>
                <div className='checkboxs py-4 space-y-2'>
                  <Form.Item className='my-0'>
                    <div>
                      {categoriesData &&
                        categoriesData?.data.map((c: TCategory) => (
                          <Checkbox
                            className='flex items-center'
                            key={c.id}
                            checked={filter.categories === c.name}
                            onChange={() => handleCategory(c.name)}
                          >
                            {c.name} <span>(0)</span>
                          </Checkbox>
                        ))}
                    </div>
                  </Form.Item>
                </div>
              </div>

              <div className='p-4 border border-grey-200 rounded-md text-[16px] md:text-lg'>
                <div className='flex justify-between items-center font-semibold dark:text-[#B9B7C0]'>
                  <p>Level khóa học</p>
                  <button onClick={() => handleLevel('')}>Đặt lại</button>
                </div>
                <div className='checkboxs py-4 space-y-2'>
                  <Form.Item name='disabled' valuePropName='backend' className='my-0'>
                    <div>
                      {levelsData &&
                        levelsData?.data.map((l: TLevel) => (
                          <Checkbox
                            className='flex items-center'
                            key={l.id}
                            checked={filter.levels === l.name}
                            onChange={() => handleLevel(l.name)}
                          >
                            {l.name}
                          </Checkbox>
                        ))}
                    </div>
                  </Form.Item>
                </div>
              </div>

              <div className='p-4 border border-grey-200 rounded-md text-[16px] md:text-lg'>
                <div className='font-semibold dark:text-[#B9B7C0]'>
                  <p>Số sao đánh giá</p>
                </div>
                <div className='checkboxs py-4 space-y-2'>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Checkbox
                      key={value}
                      className='flex items-center'
                      checked={rating === value}
                      onChange={() => handleRating(value)}
                    >
                      <Rate value={value} disabled allowHalf className='text-yellow-400 text-sm' />({value})
                    </Checkbox>
                  ))}
                </div>
              </div>
            </div>
          </Drawer>
        </div>

        <div className='right w-full md:w-[30%] hidden lg:block'>
          <Form layout='horizontal' className='space-y-4 md:space-y-6'>
            <div className='heading flex items-center  gap-2 dark:text-[#B9B7C0]'>
              <Filter size={24} />
              <h5 className='font-title text-[16px] md:text-xl'>Bộ lọc</h5>
            </div>

            <div className='p-4 border border-grey-200 rounded-md text-[16px] md:text-lg'>
              <div className='font-semibold dark:text-[#B9B7C0]'>Nhập giá tiền bạn muốn tìm</div>
              <div className='checkboxs py-4 space-y-2'>
                <Form.Item name='disabled' valuePropName='keny-white'>
                  <div className='w-full flex justify-between'>
                    <CustomInput
                      allowClear
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder='đ'
                      className='w-[72%] py-1 px-2 border rounded-[4px] '
                    />
                    <button onClick={handlePrice} type='submit' className='bg-[#b4a7f5] py-1 px-3 rounded-[4px]'>
                      Tìm kiếm
                    </button>
                  </div>
                </Form.Item>
              </div>
            </div>
            <div className='p-4 border border-grey-200 rounded-md text-[16px] md:text-lg'>
              <div className='flex justify-between items-center font-semibold dark:text-[#B9B7C0]'>
                <p>Danh mục khóa học</p>
                <button onClick={() => handleCategory('')}>Đặt lại</button>
              </div>
              <div className='checkboxs py-4 space-y-2'>
                <Form.Item className='my-0'>
                  <div>
                    {categoriesData &&
                      categoriesData?.data.map((c: TCategory) => (
                        <Checkbox
                          className='flex items-center'
                          key={c.id}
                          checked={filter.categories === c.name}
                          onChange={() => handleCategory(c.name)}
                        >
                          {c.name} <span>(0)</span>
                        </Checkbox>
                      ))}
                  </div>
                </Form.Item>
              </div>
            </div>

            <div className='p-4 border border-grey-200 rounded-md text-[16px] md:text-lg'>
              <div className='flex justify-between items-center font-semibold dark:text-[#B9B7C0]'>
                <p>Level khóa học</p>
                <button onClick={() => handleLevel('')}>Đặt lại</button>
              </div>
              <div className='checkboxs py-4 space-y-2'>
                <Form.Item name='disabled' valuePropName='backend' className='my-0'>
                  <div>
                    {levelsData &&
                      levelsData?.data.map((l: TLevel) => (
                        <Checkbox
                          className='flex items-center'
                          key={l.id}
                          checked={filter.levels === l.name}
                          onChange={() => handleLevel(l.name)}
                        >
                          {l.name}
                        </Checkbox>
                      ))}
                  </div>
                </Form.Item>
              </div>
            </div>

            <div className='p-4 border border-grey-200 rounded-md text-[16px] md:text-lg'>
              <div className='font-semibold dark:text-[#B9B7C0]'>
                <p>Số sao đánh giá</p>
              </div>
              <div className='checkboxs py-4 space-y-2'>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Checkbox
                    key={value}
                    className='flex items-center'
                    checked={rating === value}
                    onChange={() => handleRating(value)}
                  >
                    <Rate value={value} disabled allowHalf className='text-yellow-400 text-sm' />({value})
                  </Checkbox>
                ))}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Search

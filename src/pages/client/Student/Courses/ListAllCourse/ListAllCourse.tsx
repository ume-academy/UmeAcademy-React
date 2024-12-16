import Card_Horizontal from '@/components/client/commonComponents/Card/Card_Horizontal'
import DotLoader from '@/components/client/commonComponents/Loader/DotLoader'
import { formatPrice, smoothScrollToTop } from '@/constants/utils'
import useLoading from '@/hooks/useLoading'
import { TCategory } from '@/interfaces/TCategory'
import { TCourse } from '@/interfaces/TCourse'
import { TLevel } from '@/interfaces/TLevel'
import { useGetAllCategoryQuery } from '@/redux/slices/category/categoryApiSlice'
import { useGetPriceSearchQuery, useSearchCourseQuery } from '@/redux/slices/course/searchCourseApiSlice'
import { useGetAlllevelQuery } from '@/redux/slices/level/levelApiSlice'
import { Checkbox, Drawer, Form, Pagination, Rate, Slider } from 'antd'
import { Filter, ListRestart, MenuIcon, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ListAllCourse = () => {
  const location = useLocation()
  const queryURL = new URLSearchParams(location.search)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: categoriesData } = useGetAllCategoryQuery({})
  const { data: levelsData } = useGetAlllevelQuery({})
  const [rating, setRating] = useState(0)
  const nav = useNavigate()
  const perPage = 12
  const { loading } = useLoading()
  const { data: price } = useGetPriceSearchQuery({})

  const minPrice = price?.data.min_price
  const maxPrice = price?.data.max_price

  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice | minPrice, maxPrice | maxPrice])

  const isLogin = localStorage.getItem('access_Token') || '';

  useEffect(() => {
    setPriceRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const [filter, setFilter] = useState({
    name: queryURL.get('name'),
    price_min: priceRange[0],
    price_max: priceRange[1],
    categories: queryURL.get('category'),
    levels: queryURL.get('level'),
    rating: rating,
    per_page: perPage,
    page: currentPage
  })

  const { data, refetch, isLoading, isFetching } = useSearchCourseQuery(filter)

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    const updatedFilter = {
      name: queryURL.get('name') || '',
      price_min: Number(queryURL.get('price_min')) || priceRange[0],
      price_max: Number(queryURL.get('price_max')) || priceRange[1],
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

  const handlePrice = (value: [number, number]) => {
    setPriceRange(value)
    setFilter((prev) => ({
      ...prev,
      price_min: value[0],
      price_max: value[1],
      page: 1
    }))
    updateQueryParams('price_min', value.toString())
    updateQueryParams('price_max', value.toString())
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

  const resetFilters = () => {
    const resetMinPrice = minPrice || priceRange[0]
    const resetMaxPrice = maxPrice || priceRange[1]

    setPriceRange([resetMinPrice, resetMaxPrice])
    setRating(0)

    const initialFilter = {
      name: filter.name,
      price_min: resetMinPrice,
      price_max: resetMaxPrice,
      categories: '',
      levels: '',
      rating: 0,
      per_page: perPage,
      page: currentPage
    }

    setFilter(initialFilter)

    queryURL.set('price_min', resetMinPrice)
    queryURL.set('price_max', resetMaxPrice)
    queryURL.set('categories', '')
    queryURL.set('levels', '')
    queryURL.set('rating', '0')

    nav(`?${queryURL.toString()}`)
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className='py-[160px] max-w-[1280px] mx-auto px-4 lg:px-0'>
      <div className='flex flex-col-reverse lg:flex-row gap-8 md:gap-6 '>
        <div className='left w-full lg:w-[70%] space-y-4'>
          <div className='flex justify-between'>
            {filter.name ? (
              <h5 className='font-title text-[16px] md:text-xl dark:text-[#B9B7C0] pt-2'>
                Kết quả tìm kiếm cho: <span>"{filter.name}"</span>
              </h5>
            ) : (
              <h5 className='font-title text-[16px] md:text-xl dark:text-[#B9B7C0] pt-2'>
                Danh sách tất cả các khóa học
              </h5>
            )}
            <div onClick={toggleMenu} className='lg:hidden p-2 flex justify-between items-center'>
              <MenuIcon size={30} />
            </div>
          </div>

          {loading || isLoading || isFetching ? (
            <div className='min-h-screen'>
              <DotLoader />
            </div>
          ) : data?.data.length > 0 ? (
            <div>
              <div className='space-y-4 md:space-y-6'>
                {data?.data.map((course: TCourse) => <Card_Horizontal key={course.id} {...course} refetch={refetch} isLogin={isLogin}/>)}
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
              <div className='flex justify-between items-center'>
                <div className='flex items-center  gap-2 dark:text-[#B9B7C0]'>
                  <Filter size={24} />
                  <h5 className='font-title  md:text-xl'>Bộ lọc</h5>
                </div>
                <div
                  onClick={resetFilters}
                  className='hover:text-[#b9b7c0] cursor-pointer font-subtitle flex items-center gap-2 text-[16px]'
                >
                  <p>Đặt lại</p>
                  <span>
                    <ListRestart size={20} />
                  </span>
                </div>
              </div>
            }
            placement='left'
            closable={true}
            onClose={() => setIsMenuOpen(false)}
            open={isMenuOpen}
          >
            <div className='space-y-6'>
              <div className='p-4 border dark:border-[#5a5a5a] rounded-md text-[16px] md:text-lg'>
                <div className='font-semibold dark:text-[#B9B7C0]'>Tìm theo khoảng giá tiền</div>
                <div className='py-2'>
                  <Form.Item name='disabled' valuePropName='keny-white'>
                    <Slider
                      range
                      min={minPrice}
                      max={maxPrice}
                      step={10000}
                      defaultValue={[minPrice, maxPrice]}
                      value={priceRange}
                      onChange={(value) => handlePrice(value as [number, number])}
                    />
                  </Form.Item>
                </div>
                <div className='text-[16px] dark:text-[#B9B7C0] flex items-center text-center justify-between'>
                  <p>
                    Từ: <b className='text-red-400'>{formatPrice(priceRange[0])}</b>
                  </p>
                  <p>
                    Đến: <b className='text-red-400'>{formatPrice(priceRange[1])}</b>
                  </p>
                </div>
              </div>
              <div className='p-4 border dark:border-[#5a5a5a] rounded-md text-[16px] md:text-lg'>
                <div className='flex justify-between items-center font-semibold dark:text-[#B9B7C0]'>
                  <p>Danh mục khóa học</p>
                  <RotateCcw
                    size={18}
                    onClick={() => handleCategory('')}
                    className='hover:text-[#b9b7c0] cursor-pointer'
                  />
                </div>
                <div className='py-4 space-y-2'>
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

              <div className='p-4 border dark:border-[#5a5a5a] rounded-md text-[16px] md:text-lg'>
                <div className='flex justify-between items-center font-semibold dark:text-[#B9B7C0]'>
                  <p>Level khóa học</p>
                  <RotateCcw
                    size={18}
                    onClick={() => handleCategory('')}
                    className='hover:text-[#b9b7c0] cursor-pointer'
                  />
                </div>
                <div className='py-4 space-y-2'>
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

              <div className='p-4 border dark:border-[#5a5a5a] rounded-md text-[16px] md:text-lg'>
                <div className='font-semibold dark:text-[#B9B7C0]'>
                  <p>Số sao đánh giá</p>
                </div>
                <div className='py-4 space-y-2'>
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
            <div className='flex justify-between items-center'>
              <div className='flex items-center  gap-2 dark:text-[#B9B7C0]'>
                <Filter size={24} />
                <h5 className='font-title  md:text-xl'>Bộ lọc</h5>
              </div>
              <div
                onClick={resetFilters}
                className='hover:text-[#b9b7c0] cursor-pointer font-subtitle flex items-center gap-2 text-[16px]'
              >
                <p>Đặt lại</p>
                <span>
                  <ListRestart size={20} />
                </span>
              </div>
            </div>
            <div className='p-4 border dark:border-[#5a5a5a] rounded-md text-[16px] md:text-lg'>
              <div className='font-semibold dark:text-[#B9B7C0]'>Tìm theo khoảng giá tiền</div>
              <div className='py-2'>
                <Form.Item name='disabled' valuePropName='keny-white'>
                  <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    step={10000}
                    defaultValue={[minPrice, maxPrice]}
                    value={priceRange}
                    onChange={(value) => handlePrice(value as [number, number])}
                  />
                </Form.Item>
              </div>
              <div className='text-[16px] dark:text-[#B9B7C0] flex items-center text-center justify-between'>
                <p>
                  Từ: <b className='text-red-400'>{minPrice ? formatPrice(priceRange[0]) : minPrice}</b>
                </p>
                <p>
                  Đến: <b className='text-red-400'>{maxPrice ? formatPrice(priceRange[1]) : maxPrice}</b>
                </p>
              </div>
            </div>
            <div className='p-4 border dark:border-[#5a5a5a] rounded-md text-[16px] md:text-lg'>
              <div className='flex justify-between items-center font-semibold dark:text-[#B9B7C0]'>
                <p>Danh mục khóa học</p>
                <RotateCcw
                  size={18}
                  onClick={() => handleCategory('')}
                  className='hover:text-[#b9b7c0] cursor-pointer'
                />
              </div>
              <div className='py-4 space-y-2'>
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

            <div className='p-4 border dark:border-[#5a5a5a] rounded-md text-[16px] md:text-lg'>
              <div className='flex justify-between items-center font-semibold dark:text-[#B9B7C0]'>
                <p>Level khóa học</p>
                <RotateCcw
                  size={18}
                  onClick={() => handleCategory('')}
                  className='hover:text-[#b9b7c0] cursor-pointer'
                />
              </div>
              <div className='py-4 space-y-2'>
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

            <div className='p-4 border dark:border-[#5a5a5a] rounded-md text-[16px] md:text-lg'>
              <div className='font-semibold dark:text-[#B9B7C0]'>
                <p>Số sao đánh giá</p>
              </div>
              <div className='py-4 space-y-2'>
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

export default ListAllCourse

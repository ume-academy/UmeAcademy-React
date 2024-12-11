import { useFilterRevenueMutation } from '@/redux/slices/teacher/revenue/revenueApiSlice'
import { DatePicker } from 'antd'
import { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { LoadingOutlined } from '@ant-design/icons'
import { formatPrice } from '@/constants/utils'
import moment from 'moment'

const Chart = () => {
  const [startDate, setStartDate] = useState<string | ''>('')
  const [endDate, setEndDate] = useState<string | ''>('')
  const [filterRevenue, { data, isLoading }] = useFilterRevenueMutation()

  const dateData = data ? data?.data?.map((item: { date: string }) => item.date) : []
  const revenueData = data ? data?.data?.map((item: { revenue: number }) => item.revenue) : []

  useEffect(() => {
    if (startDate && endDate) {
      handleRevenue()
    }
  }, [startDate, endDate])

  const handleRevenue = () => {
    filterRevenue({
      start_date: startDate,
      end_date: endDate
    })
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt: any) {
        return [pt[0], '10%']
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dateData
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      axisLabel: {
        formatter: function (value: number) {
          return formatPrice(value)
        }
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: 'Doanh thu',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: revenueData
      }
    ]
  }

  const handleStartDateChange = (date: any) => {
    if (date) {
      setStartDate(date.format('YYYY-MM-DD'))
    } else {
      setStartDate('')
    }
  }

  const handleEndDateChange = (date: any) => {
    if (date) {
      setEndDate(date.format('YYYY-MM-DD'))
    } else {
      setEndDate('')
    }
  }

  return (
    <div className='p-4 lg:p-6'>
      <div className='flex flex-wrap space-y-3 justify-between items-center border-b dark:border-[#5a5a5a] pb-6'>
        <h2 className='text-xl font-subtitle'>Biểu đồ tổng hợp theo thời gian</h2>
        <div className='text-[14px] space-x-2 flex items-center'>
          <DatePicker
            format='DD/MM/YYYY'
            value={startDate ? moment(startDate) : null}
            onChange={handleStartDateChange}
            className='dark:bg-[#2b2838] bg-white'
            placeholder='Ngày bắt đầu '
          />
          <div>-</div>
          <DatePicker
            format='DD/MM/YYYY'
            value={endDate ? moment(endDate) : null}
            onChange={handleEndDateChange}
            className='dark:bg-[#2b2838] bg-white'
            placeholder='Ngày Kết thúc'
          />
        </div>

        {data ? (
          <ReactECharts option={option} className='w-full min-h-[400px]' />
        ) : (
          <div className='w-full min-h-[400px] flex items-center justify-center'>
            <button onClick={handleRevenue} className='border border-[#f24f3a] text-[#f24f3a] rounded-lg px-3 py-2'>
              Tải dữ liệu biểu đồ {isLoading && <LoadingOutlined />}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chart

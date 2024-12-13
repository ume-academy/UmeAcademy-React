import Loading from '@/components/client/commonComponents/Loading/Loading'
import { formatPrice } from '@/constants/utils'
import { useFilterRevenueQuery } from '@/redux/slices/teacher/revenue/revenueApiSlice'
import { DatePicker } from 'antd'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import moment from 'moment'
import { useState } from 'react'

const Chart = () => {
  const [startDate, setStartDate] = useState<string | ''>('')
  const [endDate, setEndDate] = useState<string | ''>('')
  const { data, isLoading, isFetching } = useFilterRevenueQuery({ start_date: startDate, end_date: endDate })

  console.log(data)

  const dateData = data ? data?.data?.map((item: { date: string }) => item.date) : []
  const revenueData = data ? data?.data?.map((item: { revenue: number }) => item.revenue) : []

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

        <ReactECharts option={option} className='w-full min-h-[400px]' loadingOption={isLoading} />
      </div>
    </div>
  )
}

export default Chart

import Loader from '@/components/client/commonComponents/Loader/Loader'
import Loading from '@/components/client/commonComponents/Loading/Loading'
import { TStatisticRevenue } from '@/interfaces/TStatistic'
import { useRevenueStatisticQuery } from '@/redux/slices/admin/dashboardApiSlice'
import { Input } from 'antd'
import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

const Chart_Revenue = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const { data, isLoading, refetch, isFetching } = useRevenueStatisticQuery({ year })

  useEffect(() => {
    refetch()
  }, [])

  const months = data?.data.map((item: TStatisticRevenue) => item.month) || []
  const coursesSold = data?.data.map((item: TStatisticRevenue) => item.courses_sold) || []
  const revenue = data?.data.map((item: TStatisticRevenue) => item.revenue) || []
  const newStudents = data?.data.map((item: TStatisticRevenue) => item.new_students) || []
  const totalTransaction = data?.data.map((item: TStatisticRevenue) => item.total_transaction) || []
  const refundRate = data?.data.map((item: TStatisticRevenue) => item.refund_rate) || []

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        let tooltipHtml = `${params[0].name}<br />`
        params.forEach((item: any) => {
          tooltipHtml += `${item.seriesName}: ${item.value}<br />`
        })
        return tooltipHtml
      }
    },
    legend: {
      data: ['Doanh thu', 'Tỷ lệ hoàn tiền', 'Khóa học đã bán', 'Học viên mới', 'Số giao dịch'],
      bottom: 0
    },
    xAxis: {
      type: 'category',
      data: months,
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
        formatter: 'Tháng {value}'
      }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Doanh thu (đ) / Tỷ lệ hoàn (%)',
        position: 'left',
        axisLine: { show: true },
        axisLabel: {
          formatter: (value: number, index: number) => {
            // Kiểm tra refundRate có tồn tại và hợp lệ
            if (Array.isArray(refundRate) && refundRate[index] !== undefined && refundRate[index] >= 0) {
              return `${value.toLocaleString()} đ / ${refundRate[index]}%` // Doanh thu và Tỷ lệ
            }
            return `${value.toLocaleString()} đ` // Chỉ hiển thị doanh thu
          }
        },
        min: 0
      },
      {
        type: 'value',
        name: 'Số lượng',
        position: 'right',
        axisLine: { show: true },
        axisLabel: {
          formatter: '{value}'
        },
        min: 0
      }
    ],

    series: [
      {
        name: 'Khóa học đã bán',
        type: 'bar',
        data: coursesSold,
        itemStyle: { color: '#5470C6' },
        yAxisIndex: 1
      },
      {
        name: 'Học viên mới',
        type: 'bar',
        data: newStudents,
        itemStyle: { color: '#91CC75' },
        yAxisIndex: 1
      },
      {
        name: 'Doanh thu',
        type: 'bar',
        data: revenue,
        itemStyle: { color: '#f24f3a' },
        yAxisIndex: 0
      },
      {
        name: 'Tỷ lệ hoàn tiền',
        type: 'line',
        data: refundRate,
        itemStyle: { color: '#FAC858' },
        yAxisIndex: 0
      },
      {
        name: 'Số giao dịch',
        type: 'line',
        data: totalTransaction,
        itemStyle: { color: '#73C6B6' },
        yAxisIndex: 1
      }
    ]
  }

  return (
    <div className='w-full h-[400px] p-4 bg-white dark:bg-[#2b2838] border border-[#e9ecef] dark:border-[#5a5a5a] rounded-lg shadow-md'>
      <div className='flex justify-center gap-3'>
        <h2 className='text-lg font-subtitle dark:text-[#b9b7c0] text-center'>
          Biểu đồ tổng thống kê 12 tháng theo năm
        </h2>
        <div className='w-[126px]'>
          <Input value={year} onChange={(e) => setYear(Number(e.target.value))} placeholder='Nhập năm' min={2000} />
        </div>
      </div>
      {isLoading || isFetching ? (
        <div className='h-full flex justify-center items-center'>
          <Loading />
        </div>
      ) : (
        <ReactECharts option={option} className='h-full' />
      )}
    </div>
  )
}

export default Chart_Revenue

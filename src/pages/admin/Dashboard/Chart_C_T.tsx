import { TCourse } from '@/interfaces/TCourse'
import { TTeacher } from '@/interfaces/TTeacher'
import { useTopCourseQuery, useTopTeacherQuery } from '@/redux/slices/admin/dashboardApiSlice'
import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

const Chart_C_T = () => {
  const { data: teacher, isLoading: teacherLoading } = useTopTeacherQuery({})
  const { data: course, isLoading: courseLoading } = useTopCourseQuery({})

  const generateColors = (numItems: number) => {
    const colorPalette = [
      '#ff5364',
      '#1677ff',
      '#28a745',
      '#f39c12',
      '#9b59b6',
      '#e74c3c',
      '#2ecc71',
      '#1abc9c',
      '#34495e',
      '#f1c40f'
    ]
    return colorPalette.slice(0, numItems)
  }

  const createChartOption = (title: string, data: { name: string; image?: string; value: number; type: string }[]) => {
    const colors = generateColors(data.length)
    return {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 18,
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `
            <div style="display: flex; align-items: center; max-width: 350px; white-space: normal; word-wrap: break-word; word-break: break-word;">
              <img src="${params.data.image}" alt="${params.data.name}" 
              style="width:50px;height:50px;border-radius:50%;margin-right:10px;"/>
              <div>
                <strong>${params.data.name}</strong><br/>
                ${params.data.type}: ${params.data.value.toLocaleString()}<br/>
              </div>
            </div>
          `
        }
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.name),
        axisLabel: {
          interval: 0, // Đảm bảo tất cả tên đều hiển thị
          rotate: 0, // Xoay nhãn nếu cần thiết
          formatter: function (value: string) {
            const maxLength = 17 // Giới hạn số lượng ký tự cho mỗi dòng
            if (value.length > maxLength) {
              const words = value.split(' ')
              let result = ''
              let line = ''
              words.forEach((word) => {
                if (line.length + word.length + 1 <= maxLength) {
                  line += ' ' + word
                } else {
                  result += line.trim() + '\n'
                  line = word
                }
              })
              result += line.trim() // Thêm dòng cuối
              return result
            }
            return value
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} '
        }
      },
      grid: {
        left: '15%',
        bottom: '20%'
      },
      series: [
        {
          name: 'Doanh thu',
          type: 'bar',
          data: data.map((item, index) => ({
            value: item.value,
            name: item.name,
            image: item.image,
            type: item.type,
            itemStyle: { color: colors[index] }
          })),
          label: {
            show: true,
            position: 'top',
            formatter: '{c} '
          }
        }
      ]
    }
  }

  const [teacherData, setTeacherData] = useState<any[]>([])
  const [courseData, setCourseData] = useState<any[]>([])

  useEffect(() => {
    if (!teacherLoading && teacher?.data?.length > 0) {
      setTeacherData(
        teacher.data.map((t: TTeacher) => ({
          name: t.fullname,
          image: t.avatar,
          value: t.total_earnings,
          type: 'Doanh thu (đ)'
        }))
      )
    }

    if (!courseLoading && course?.data?.length > 0) {
      setCourseData(
        course.data.map((c: TCourse) => ({
          name: c.name,
          image: c.thumbnail,
          value: c.total_student,
          type: 'Lượt bán'
        }))
      )
    }
  }, [teacher, course, teacherLoading, courseLoading])



  return (
    <div className='p-4 flex flex-wrap bg-white dark:bg-[#2b2838] border border-[#e9ecef] dark:border-[#5a5a5a] rounded-lg shadow-md'>
      <div className='w-full lg:w-[47%] h-[360px]'>
        <h2 className='text-lg font-subtitle dark:text-[#b9b7c0] lg:ml-24'>
          Bảng xếp hạng giảng viên có doanh thu cao nhất
        </h2>
        <ReactECharts option={createChartOption('', teacherData)} className='w-full h-full' />
      </div>
      <div className='w-full lg:w-[47%] h-[360px]'>
        <h2 className='text-lg font-subtitle dark:text-[#b9b7c0] lg:ml-24'>
          Bảng xếp hạng khóa học có lượt bán nhiều nhất
        </h2>
        <ReactECharts option={createChartOption('', courseData)} className='w-full h-full' />
      </div>
    </div>
  )
}

export default Chart_C_T

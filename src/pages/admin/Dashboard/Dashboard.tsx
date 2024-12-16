import Chart_C_T from './Chart_C_T'
import StatisticsAll from './StatisticsAll'

const Dashboard = () => {
  return (
    <div className='w-full space-y-6'>
      <StatisticsAll/>
      <Chart_C_T />
    </div>
  )
}

export default Dashboard

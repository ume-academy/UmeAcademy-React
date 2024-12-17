import Chart_C_T from './Chart_C_T'
import Chart_Revenue from './Chart_Revenue'
import StatisticsAll from './StatisticsAll'

const Dashboard = () => {
  return (
    <div className='w-full space-y-6'>
      <StatisticsAll/>
      <Chart_Revenue/>
      <Chart_C_T />
    </div>
  )
}

export default Dashboard

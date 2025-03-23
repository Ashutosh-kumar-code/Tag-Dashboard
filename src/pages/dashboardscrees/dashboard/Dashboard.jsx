
import Total from './Total'
import BarChart from '../dashboard/BarChart'
import DoughnutChart from './DoughnutChart'
import DashboardProjectList from './DashboardProjectList'



const Dashboard = () => {
  return (
    <div>
      <Total />
      <div className=' flex flex-wrap justify-between'>
        {/* <BarChart /> */}
        {/* <DoughnutChart /> */}
        <div className=' w-full mt-6'>
          <DashboardProjectList />
        </div>
     
       
      </div>
    </div>
  )
}

export default Dashboard
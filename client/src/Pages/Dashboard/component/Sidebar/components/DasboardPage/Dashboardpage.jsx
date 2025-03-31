import Details from './components/ViewDetials';
import BarChart from '../../../Graph/Barcharts';
//import Linechart from '../../../Graph/Linecharts';
import DoughnutChart from '../../../Graph/DoughNutCharts';
import LineChart from '../../../Graph/LineCharts'
import PolarChart from '../../../Graph/PolarChart';
function DashboardPage() {
  return (
    <>
      <div style={{ width: '100%', height: 'auto', padding: '20px' }}>
        <Details />
        {/* <div style={{ display: 'flex',  marginTop:'40px'}}>
          <div style={{ width: '50%', height: '60vh' }}>
            <BarChart />
          </div>
          <div style={{ width: '50%', height: 'auto', }}>
           
            <div style={{width:'100%' ,  height:'30vh'}}>
              <LineChart/>
            </div>
            <div style={{ display:'flex', width:'50%' ,  height:'30vh'}}>
              <PolarChart />
              <DoughnutChart />
            </div>
          </div>
        </div> */}
      </div>

    </>

  );
}

export default DashboardPage;

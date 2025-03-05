import Details from './components/ViewDetials';
import BarChart from '../../../Graph/Barcharts';
//import Linechart from '../../../Graph/Linecharts';

function DashboardPage() {
  return (
    <>
      <div style={{ width: '100%', height: 'auto', padding: '20px' }}>
        <Details />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'40px'}}>
          <div style={{ width: '100%', height: '60vh' }}>
            <BarChart />
          </div>
          {/* <div style={{ width: '50%', height: 'auto' }}>
            <Linechart />
          </div> */}
        </div>
      </div>

    </>

  );
}

export default DashboardPage;

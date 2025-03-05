import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Details from './components/ViewDetials';
import BarChart from '../../../Graph/Barcharts';
import Linechart from '../../../Graph/Linecharts';

function DashboardPage() {
  return (
    <>
      <div style={{ width: '100%', height: 'auto', padding: '20px' }}>
        <Details />
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          <div style={{ width: '50%', height: 'auto' }}>
            <BarChart />
          </div>
          <div style={{ width: '50%', height: 'auto' }}>
            <Linechart />
          </div>
        </div>
      </div>

    </>

  );
}

export default DashboardPage;

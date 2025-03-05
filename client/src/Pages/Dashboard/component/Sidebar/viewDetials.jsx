import {  Typography } from '@mui/material';
// import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Details = () => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center', // Centers the flex items horizontally
                    alignItems: 'flex-start', // Centers the flex items vertically
                    minHeight: 'auto', 
                    flexDirection: 'row', // Aligns items horizontally
                    gap: '20px', // Adds space between flex items
                }}
            >
                <div
                    style={{
                        width: '30%', // Each item takes up 30% of the container
                        minWidth: '250px', // Ensures the items don't become too narrow
                        textAlign: 'left',
                        backgroundColor: '#0274db',
                        padding: '20px',
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h6" style={{ display:'flex', justifyContent:'space-between', fontWeight: 'bold', color: "white" }}>
                        Canditates
                        <div className='flex'>
                        <span className='text-5xl'>+94</span>
                        <TrendingUpIcon  style={{ color: '#3dfa05', fontSize:'50px' }} />
                        </div>
                    </Typography>
                    {/* <Typography style={{ color: '#388e3c' }}>+93</Typography> */}
                    <Typography className='text-blue-300 flex items-center justify-between cursor-pointer'>
                        View Detail
                        <ArrowForwardIosIcon style={{fontSize:'15px'}}/>
                    </Typography>
                </div>

                <div
                    style={{
                        width: '30%', // Each item takes up 30% of the container
                        minWidth: '250px', // Ensures the items don't become too narrow
                        textAlign: 'left',
                        backgroundColor: '#0274db',
                        padding: '20px',
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h6" style={{ display:'flex', justifyContent:'space-between', fontWeight: 'bold', color: "white" }}>
                    Job openings
                        <div className='flex'>
                        <span className='text-5xl'>+101</span>
                        <TrendingUpIcon  style={{ color: '#3dfa05', fontSize:'50px' }} />
                        </div>
                    </Typography>
                    {/* <Typography style={{ color: '#388e3c' }}>+93</Typography> */}
                    <Typography className='text-blue-300 flex items-center justify-between cursor-pointer '>
                        View Detail
                        <ArrowForwardIosIcon style={{fontSize:'15px'}}/>
                    </Typography>
                </div>

                <div
                    style={{
                        width: '30%', // Each item takes up 30% of the container
                        minWidth: '250px', // Ensures the items don't become too narrow
                        textAlign: 'left',
                        backgroundColor: '#0274db',
                        padding: '20px',
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h6" style={{ display:'flex', justifyContent:'space-between', fontWeight: 'bold', color: "white" }}>
                    Companies
                        <div className='flex'>
                        <span className='text-5xl'>+30</span>
                        <TrendingUpIcon  style={{ color: '#3dfa05', fontSize:'50px' }} />
                        </div>
                    </Typography>
                    {/* <Typography style={{ color: '#388e3c' }}>+93</Typography> */}
                    <Typography className='text-blue-300 flex items-center justify-between cursor-pointer'>
                        View Detail
                        <ArrowForwardIosIcon style={{fontSize:'15px'}}/>
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default Details;

import {  Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const Details = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'row',
                gap: '20px',
                flexWrap: 'wrap', // Allow wrapping for smaller screens
            }}
        >
            {['Candidates', 'Job Openings', 'Companies'].map((item, index) => (
                <div
                    key={index}
                    style={{
                        width: '30%',
                        minWidth: '250px',
                        textAlign: 'left',
                        backgroundColor: '#53ed46',
                        padding: '20px',
                        borderRadius: '8px',
                        flex: '1 1 250px', // Flex grow, shrink, and base width
                        margin: '10px', // Add margin for spacing
                    }}
                >
                    <Typography variant="h6" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'white' ,textShadow:'2px 2px 4px #000000' }}>
                        {item}
                        <div className='flex'>
                            <span className='text-5xl'>+94</span>
                            <TrendingUpIcon style={{ color: '#0017ff', fontSize: '50px' }} />
                        </div>
                    </Typography>
                            {/* <div className='text-right mr-14 text-red-400'>-4</div> */}
                    <Typography sx={{marginTop:'10px'}} className='text-white flex items-center justify-between cursor-pointer p-4  bg-green-500 rounded-sm'>
                        View Detail
                        <ArrowForwardIosIcon style={{ fontSize: '15px'  }} />
                    </Typography>
                </div>
            ))}
        </div>
    );
};
export default Details;
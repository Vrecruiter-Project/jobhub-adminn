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
                        backgroundColor: '#0274db',
                        padding: '20px',
                        borderRadius: '8px',
                        flex: '1 1 250px', // Flex grow, shrink, and base width
                        margin: '10px', // Add margin for spacing
                    }}
                >
                    <Typography variant="h6" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'white' }}>
                        {item}
                        <div className='flex'>
                            <span className='text-5xl'>+94</span>
                            <TrendingUpIcon style={{ color: '#3dfa05', fontSize: '50px' }} />
                        </div>
                    </Typography>
                    <Typography className='text-blue-300 flex items-center justify-between cursor-pointer'>
                        View Detail
                        <ArrowForwardIosIcon style={{ fontSize: '15px' }} />
                    </Typography>
                </div>
            ))}
        </div>
    );
};
export default Details;
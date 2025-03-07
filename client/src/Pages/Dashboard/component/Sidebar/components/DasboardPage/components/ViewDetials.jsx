import HailIcon from '@mui/icons-material/Hail'; // for candidates
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone'; // for jobs
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone'; // for company
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';

const Details = () => {
    return (
        <>
            <div className='flex flex-wrap justify-center items-center gap-6 p-4'>
                {/* Company Card */}
                <div style={{ backgroundColor: '#62fcaf' }} className='w-full sm:w-80 p-3 rounded-2xl'>
                    <div className='text-4xl'>
                        <div className='flex w-20 justify-between items-center p-1 text-4xl gap-1.5 mb-1.5'>
                            <BusinessTwoToneIcon style={{ fontSize: '2rem' }} />
                            +94
                        </div>
                        Company
                    </div>
                    <div style={{ backgroundColor: '#bcfd49' }} className='p-1 flex items-center justify-between rounded-2xl px-5 mt-1'>
                        View Details
                        <ArrowForwardTwoToneIcon />
                    </div>
                </div>

                {/* Jobs Card */}
                <div style={{ backgroundColor: '#62fcaf' }} className='w-full sm:w-80 p-3 rounded-2xl'>
                    <div className='text-4xl'>
                        <div className='flex w-20 justify-between items-center p-1 text-4xl gap-1.5 mb-1.5'>
                            <WorkTwoToneIcon style={{ fontSize: '2rem' }} />
                            +94
                        </div>
                        Jobs
                    </div>
                    <div style={{ backgroundColor: '#bcfd49' }} className='p-1 flex items-center justify-between rounded-2xl px-5 mt-1'>
                        View Details
                        <ArrowForwardTwoToneIcon />
                    </div>
                </div>

                {/* Candidates Card */}
                {/* <div style={{ backgroundColor: '#62fcaf' }} className='w-full sm:w-80 p-3 rounded-2xl'>
                    <div className='text-4xl'>
                        <div className='flex w-20 justify-between items-center p-1 text-4xl gap-1.5 mb-1.5'>
                            <HailIcon style={{ fontSize: '2rem' }} />
                            +94
                        </div>
                        Candidates
                    </div>
                    <div style={{ backgroundColor: '#bcfd49' }} className='p-1 flex items-center justify-between rounded-2xl px-5 mt-1'>
                        View Details
                        <ArrowForwardTwoToneIcon />
                    </div>
                </div> */}

                {/* Add Candidate Card */}
                <div style={{ backgroundColor: '#62fcaf' }} className='w-full sm:w-80 p-3 rounded-2xl'>
                    <div className='text-4xl'>
                        <div className='flex justify-center items-center p-1 text-4xl gap-1.5 mb-1.5'>
                            <HowToRegTwoToneIcon style={{ fontSize: '5rem' }} />
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#7483bd' }} className='p-1 flex items-center justify-center gap-3.5 rounded-2xl px-5 mt-1'>
                        Add Job
                        <AddCircleOutlineTwoToneIcon />
                    </div>
                </div>
                <div style={{ backgroundColor: '#62fcaf' }} className='w-full sm:w-80 p-3 rounded-2xl'>
                    <div className='text-4xl'>
                        <div className='flex justify-center items-center p-1 text-4xl gap-1.5 mb-1.5'>
                            <HowToRegTwoToneIcon style={{ fontSize: '5rem' }} />
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#7483bd' }} className='p-1 flex items-center justify-center gap-3.5 rounded-2xl px-5 mt-1'>
                        Add Candidate
                        <AddCircleOutlineTwoToneIcon />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;
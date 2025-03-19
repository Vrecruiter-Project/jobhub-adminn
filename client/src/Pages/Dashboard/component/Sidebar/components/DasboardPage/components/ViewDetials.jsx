import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone'; // for company
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import { Button} from '@mui/material';
import BasicModal from '../../../../Model/Model';
import AddJobs from "../../../../../../Form/Addjob";
import AddCandidates from "../../../../../../Form/Addcandidate"
import Diversity3Icon from '@mui/icons-material/Diversity3';
import useFetchCounts from './Number';
import Groups3Icon from '@mui/icons-material/Groups3';

const Details = () => {
    const buttonStyle = {
        backgroundColor: '#7483bd',
        color: 'Black',
        padding: '10px 50px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        width: "100%",
    };
    const { totalCount, totalCandidateNum } = useFetchCounts();
    
    return (
        <>
            <div className='flex flex-wrap justify-center items-center gap-6 p-4'>
                {/* Company Card */}
                <div style={{ backgroundColor: '#62fcaf' }} className='w-full sm:w-80 p-3 rounded-2xl'>
                    <div className='text-4xl'>
                        <div className='flex w-20 justify-between items-center p-1 text-4xl gap-1.5 mb-1.5'>
                            <BusinessTwoToneIcon style={{ fontSize: '2rem' }} />
                            {totalCount}+
                        </div>
                        Company
                    </div>
                    <div style={{ backgroundColor: '#bcfd49' }} className='p-1 flex items-center justify-between rounded-2xl px-5 mt-1'>
                        <Button style={{ color: "black" }} variant="text" > View Details</Button>
                        <ArrowForwardTwoToneIcon />
                    </div>
                </div>

                {/* Jobs Card */}
                <div style={{ backgroundColor: '#62fcaf' }} className='w-full sm:w-80 p-3 rounded-2xl'>
                    <div className='text-4xl'>
                        <div className='flex w-20 justify-between items-center p-1 text-4xl gap-1.5 mb-1.5'>
                            <Diversity3Icon style={{ fontSize: '2rem' }} />
                            {totalCandidateNum}+
                        </div>
                        Candidates
                    </div>
                    <div style={{ backgroundColor: '#bcfd49' }} className='p-1 flex items-center justify-between rounded-2xl px-5 mt-1'>

                        {/* Add button for jobs */}
                        <Button style={{ color: "black" }} variant="text"> View Candidate
    
                        </Button><ArrowForwardTwoToneIcon />


                    </div>
                </div>
                {/* Add Candidate Card */}
                <div style={{ backgroundColor: '#62fcaf' }} className='w-full sm:w-80 p-3 rounded-2xl'>
                    <div className='text-4xl'>
                        <div className='flex justify-center items-center p-1 text-4xl gap-1.5 mb-1.5'>
                            <Groups3Icon style={{ fontSize: '5rem' }} />
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#7483bd' }} className='p-1 flex items-center justify-center gap-3.5 rounded-2xl px-5 mt-1'>


                        {/* add button to add jobs */}

                        <BasicModal btn='Add jobs' form={<AddJobs />} btnStyle={buttonStyle}> </BasicModal>





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
                        <BasicModal btn='Add Candidate' form={<AddCandidates />} btnStyle={buttonStyle} />
                        <AddCircleOutlineTwoToneIcon />

                      

                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;




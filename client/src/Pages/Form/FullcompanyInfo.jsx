
import { useEffect, useState } from 'react';
import { JOBHUB_BASE_URL } from '../../api/api'
import ApartmentIcon from '@mui/icons-material/Apartment';
import PlaceIcon from '@mui/icons-material/Place';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './cards.css'
import { ApartmentRounded, BusinessCenter, BusinessOutlined, BusinessSharp,  CastForEducation, LanguageTwoTone, LightMode, LockClockOutlined, People, Person,  PrecisionManufacturing,  RollerShadesClosed,  Timelapse, } from '@mui/icons-material';
import { Button,  CircularProgress } from '@mui/material';

import Person2Icon from '@mui/icons-material/Person2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { capitalizeWords } from '../Dashboard/component/Sidebar/components/CandidatePage/util/CapitalWord';
import PropTypes from 'prop-types';
                
const Cards = ({
    _id,
    companyName,
    jobTitle,
    jobRole,
    numberOfPosition,
    jobType,
    workType,
    ExpireJob,
    benefits,
    salary,
    jobLocation,
    education,
    english,
    experience,
    gender,
    age,
    description,
    interviewMode,
    communication}) => {

        const themeT = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#074799', // Set default icon color to green
        },
      },
    },
  },
});
    return (
        <>
            <ThemeProvider theme={themeT}>

            
            <div className='root1'>
                <div className="contPart">
                    <div className='apart'>
                        <ApartmentIcon sx={{ width: '50px', height: '50px', color:"green"}} />
                    
                        <h3>{capitalizeWords(jobRole)}</h3>
                    </div>
                    <div>
                        {companyName}
                    </div>
                </div>
                <div className='location'>
                    <div className='location'>
                        <PlaceIcon sx={{ width: '20px', height: '20px' }} />
                        {jobLocation}
                    </div>
                    <div className='currn'>
                        <CurrencyRupeeIcon sx={{ width: '20px', height: '20px' }} />
                        {salary} monthly
                    </div>
                </div>
                <div className='workType'>
                    <div>
                        <BusinessOutlined sx={{width:'18px'}} /> {workType}
                    </div>
                    <div>
                        <LockClockOutlined sx={{width:'18px'}} /> {jobType}
                    </div>
                    <div>
                        <BusinessCenter sx={{width:'18px'}} /> {experience}
                    </div>
                    <div>
                        <LanguageTwoTone sx={{width:'18px'}} /> {english}
                    </div>

                    </div>
                <div className='jobHighlight'>
                    Job highlights
                    <div className='avia-1'>
                        <People /> {numberOfPosition} Candidates
                        <div className='interviwe'>
                            InterviewMode:
                            <div className='mode'>{interviewMode}</div>
                        </div>
                    </div>
                    <div>
                        <h3 className='benifits'>Benifits</h3>
                        <div className='datBeni'>
                            {benefits.map((item, index) => (
                                (<div className='intemList' key={index}>{item}</div>)
                        ))}
                        </div>
                    </div>
                </div>

                <div className='jobDesc'>
                    <span className='jobdec'>Job Description</span>
                    <br />
                    {description}
                </div>
                <h2 className='TextJob'>Job Role</h2>
                <div className='jobRoleCont'>
                    
                    <div className='part-1'>
                        <div className='wLocation'>
                            <div><BusinessOutlined/></div>
                            <div className='timer'>
                                <span>Work Location</span>
                                <span>{jobLocation}</span>
                            </div>
                        </div>
                        <div className='wLocation'>
                            <div><RollerShadesClosed/></div>
                            <div className='timer'>
                                <span>Role / Category</span>
                                <span>{jobRole}</span>
                            </div>
                        </div>
                        <div className='wLocation'>
                            <div><LightMode/></div>
                            <div className='timer'>
                                <span>Shift</span>
                                <span>Morning / Night</span>
                            </div>
                        </div>
                    </div>

                    <div className='part-1'> 
                    <div className='wLocation'>
                            <div><PrecisionManufacturing/></div>
                            <div className='timer'>
                                <span>Department</span>
                                <span>{jobTitle}</span>
                            </div>
                        </div>
                        <div className='wLocation'>
                            <div><Timelapse/></div>
                            <div className='timer'>
                                <span>Employment type</span>
                                <span>{jobType}</span>
                            </div>
                        </div>

                    </div>
                </div>

                <h2 className='TextJob'>Job Requirement</h2>
                <div className='JobRequire'>
                    <div className='part-1'>
                    <div className='wLocation'>
                            <div><Person2Icon/></div>
                            <div className='timer'>
                                <span>Age</span>
                                <span>{age}</span>
                            </div>
                        </div>
                    <div className='wLocation'>
                            <div><BusinessCenter/></div>
                            <div className='timer'>
                                <span>Experience</span>
                                <span>{experience}</span>
                            </div>
                        </div>
                        <div className='wLocation'>
                            <div><LanguageTwoTone/></div>
                            <div className='timer'>
                                <span>English level</span>
                                <span>{english}</span>
                            </div>
                        </div>
                </div>
                    <div className='part-1'>
                    <div className='wLocation'>
                            <div><CastForEducation/></div>
                            <div className='timer'>
                                <span>Education</span>
                                <span>{education}</span>
                            </div>
                        </div>
                        <div className='wLocation'>
                            <div><Person/></div>
                            <div className='timer'>
                                <span>Gender</span>
                                <span>{gender}</span>
                            </div>
                        </div>
                </div>
                </div>
                
                <h2 className='TextJob'>About Company</h2>
                <div>
                    <div className='part-1'>
                    <div className='wLocation'>
                            <div><BusinessSharp/></div>
                            <div className='timer'>
                                <span>Name</span>
                                <span>{companyName}</span>
                            </div>
                        </div>
                        <div className='wLocation'>
                            <div><ApartmentRounded/></div>
                            <div className='timer'>
                                <span>Address</span>
                                <span>{jobLocation}</span>
                            </div>
                        </div>
                    </div>
                    <div className='part-1'></div>
                </div>
                </div>
                </ThemeProvider>
        </>
    )
};
    Cards.propTypes = {
    _id: PropTypes.number.isRequired,
        companyName: PropTypes.number.isRequired,
        jobTitle: PropTypes.number.isRequired,
        jobRole: PropTypes.number.isRequired,
        numberOfPosition: PropTypes.number.isRequired,
        jobType: PropTypes.number.isRequired,
        workType: PropTypes.number.isRequired,
        ExpireJob: PropTypes.number.isRequired,
        benefits: PropTypes.number.isRequired,
        salary: PropTypes.number.isRequired,
        jobLocation: PropTypes.number.isRequired,
        education: PropTypes.number.isRequired,
        english: PropTypes.number.isRequired,
        experience: PropTypes.number.isRequired,
        gender: PropTypes.number.isRequired,
        age: PropTypes.number.isRequired,
        description: PropTypes.number.isRequired,
        communication: PropTypes.number.isRequired,


}

export default function ShowCardInfo ({jobId})  {
    const [cardInfo, setCardInfo] = useState([])
    useEffect(() => {
        getCardsInfo()
    }, [])
    
    async function getCardsInfo() {
        try {
                
            const response = await fetch(`${JOBHUB_BASE_URL}/v1/admins/alljobs`,{
                method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_SECRET_KEY,
          },
            });
            if (!response.ok) throw new Error("Failed to fetch jobs");
            const json = await response.json();
            setCardInfo(json.jobs || []);
        } catch (error) {
            console.error(error)
            alert("Failed to load data, please try again later.");
        }
        }
    

    const filteredCardInfo = cardInfo.filter(job => job._id === jobId);
    return (
        <>
            {
                filteredCardInfo.length === 0 ? <CircularProgress/> :
                filteredCardInfo.map((shocase, index) => (
                <Cards {...shocase} key={index} />
                ))
            }
        </>
    )
};


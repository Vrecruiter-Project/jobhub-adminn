import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import WorkIcon from '@mui/icons-material/Work';
import HailIcon from '@mui/icons-material/Hail';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDemoRouter } from '@toolpad/core/internal';
import JobsPage from '../Dashboard/component/Sidebar/components/JobsPage/Jobspage';
import CandidateData from './component/Sidebar/components/CandidatePage/Candidate'; 
import React from 'react';
import Logo from '/log.svg'

const Navigation = [
    { kind: 'header', title: 'Hr Overview' },
    { segment: 'jobs', title: "JOBS", icon: <WorkIcon /> },
    { segment: 'candidate', title: "CANDIDATE", icon: <HailIcon /> },
    { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
];

const HrDashboard = () => {
    const router = useDemoRouter('/jobs');

    const renderPage = () => {
        switch (router.pathname) {
            case '/jobs':
                return <JobsPage />;
            case '/candidate':
                return <CandidateData />;
            default:
                return null;
        }
    };

    const navigationWithActiveIcons = Navigation.map((item) => {
        if (item.segment) {
            return {
                ...item,
                icon: React.cloneElement(item.icon, {
                    //style: { color: isActive(router.pathname, item.segment) ? 'green' : 'inherit' },
                }),
            };
        }
        return item;
    });

    return (
        <AppProvider
            navigation={navigationWithActiveIcons}
            router={router}
            branding={{
                title: <div className='text-green-400'>John <sup className='text-green-300' style={{ fontSize:'10px'}}>HR</sup></div>,
                logo: <img className='w-10' src={Logo} alt='job hub' />
            }
            }
        >
            <DashboardLayout>
                {renderPage()}
            </DashboardLayout>
        </AppProvider>
    );
};

export default HrDashboard;
import React from 'react';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import HailIcon from '@mui/icons-material/Hail';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDemoRouter } from '@toolpad/core/internal';
import Logo from '/logo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { BASE_URL } from '../../../../api/api';
// Import Demo Pages
import DashboardPage from './components/DasboardPage/Dashboardpage';
import CompanyPage from './components/CompanyPage/Companypage';
import JobsPage from './components/JobsPage/Jobspage';
import CandidatePage from './components/CandidatePage/Candidate';
import useOnline from '../../../../../utils/useOnline';
import { OffLine } from '../../../../../utils/Error';
import PersonIcon from '@mui/icons-material/Person';
import Groups2Icon from '@mui/icons-material/Groups2';
import InterestedCandidate from './components/CandidatePage/util/Intrestedcandidate';
// Navigation Configuration
const NAVIGATION = [
  { kind: 'header', title: 'Overview' },
  { segment: 'dashboard', title: 'DASHBOARD', icon: <DashboardIcon /> },
  { segment: 'company', title: 'COMPANY', icon: <BusinessIcon /> },
  { segment: 'jobs', title: 'JOBS', icon: <WorkIcon /> },
  {
    segment: 'candidate', title: 'CANDIDATE', icon: <HailIcon />,
    children: [
      {
        segment: 'allCandidates',
        title: 'All Candidates',
        icon: <Groups2Icon />,
        path: '/candidate/allCandidates',
      },
      {
        segment: 'interestedCandidate',
        title: 'Interested Candidates',
        icon: <PersonIcon />,
        path: '/candidate/interestedCandidate',
      }
    ]
  },
  {
    segment: 'logout', title: 'Logout', icon: <LogoutIcon />,
    
    
  },
];

// Theme Configuration
const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

// Utility Function to Check Active Segment
const isActive = (pathname, segment) => {
  if (segment === 'candidate') {
    return pathname.startsWith('/candidate');
  }
  return pathname === `/${segment}`;
};
// Main Component
function AppProviderBasic() {
  const router = useDemoRouter('/dashboard');

  // Function to determine which page to render
  const renderPage = () => {
    switch (router.pathname) {
      case '/dashboard':
        return <DashboardPage />;
      case '/company':
        return <CompanyPage />;
      case '/jobs':
        return <JobsPage />;
      case '/candidate':
        return <CandidatePage />;
      case '/candidate/allCandidates':
        return <CandidatePage />; 
      case '/candidate/interestedCandidate':
        return <InterestedCandidate />; 
      default:
        return <DashboardPage />;
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Redirect after successful logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error); // Log the error if something goes wrong
    }
  };

  // Update NAVIGATION with active icon styling and onClick handler for logout
  const navigationWithActiveIcons = NAVIGATION.map((item) => {
    if (item.segment === 'logout') {
      return {
        ...item,
        icon: React.cloneElement(item.icon, {
          onClick: () => handleLogout(),
        }),
        title: (
          <div
            style={{ padding: '10px', cursor: 'pointer' }}
            onClick={() => handleLogout()}
          >
            {item.title}
          </div>
        ),
      };
    }
  
    if (item.segment) {
      return {
        ...item,
        icon: React.cloneElement(item.icon, {
          style: { color: isActive(router.pathname, item.segment) ? 'green' : 'inherit' },
        }),
      };
    }
  
    if (item.children) {
      return {
        ...item,
        children: item.children.map((child) => ({
          ...child,
          icon: React.cloneElement(child.icon, {
            style: { color: isActive(router.pathname, child.segment) ? 'green' : 'inherit' },
          }),
        })),
      };
    }
  
    return item;
  });

  const Off = useOnline();
  if (!Off) {
    return <OffLine />;
  }

  return (
    <AppProvider
      navigation={navigationWithActiveIcons}
      router={router}
      theme={demoTheme}
      branding={{
        title: <div className='text-green-400'>JOB HUB <sup className='text-green-300' style={{fontSize:'10px'}}>admin</sup></div>,
        logo: <img className='w-10' src={Logo} alt="job-hub" />,
      }}
    >
      <DashboardLayout>
        {renderPage()}
      </DashboardLayout>
    </AppProvider>
  );
};

export default AppProviderBasic;

// import { createTheme } from '@mui/material/styles';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import WorkIcon from '@mui/icons-material/Work';
// import BusinessIcon from '@mui/icons-material/Business';
// import HailIcon from '@mui/icons-material/Hail';
// import { useDemoRouter } from '@toolpad/core/internal';
// import Logo from '/logo.png';
// import BarChart from '../Graph/Charts';
// import { useTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';

// const NAVIGATION = [
//     { kind: 'header', title: 'Overview' },
//     { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
//     { segment: 'company', title: 'Company', icon: <BusinessIcon /> },
//     { segment: 'jobs', title: 'Jobs', icon: <WorkIcon /> },
//     { segment: 'candidate', title: 'Candidate', icon: <HailIcon /> },
// ];

// const demoTheme = createTheme({
//     cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
//     colorSchemes: { light: true, dark: true },
//     breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
// });

// function DemoPageContent({ pathname }) {
//   const theme = useTheme();

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
//       <Typography>{pathname}</Typography>
//       <BarChart theme={theme} />
//     </Box>
//   );
// }

// DemoPageContent.propTypes = { pathname: PropTypes.string.isRequired };

// function AppProviderBasic() {
//   const router = useDemoRouter('/dashboard'); // Fixed: Use lowercase to match segments

//   return (
//     <AppProvider
//       navigation={NAVIGATION}
//       router={router}
//       theme={demoTheme}
//       branding={{
//         title: <Typography className="text-2xl">Job Hub <sup>admin</sup></Typography>,
//         logo: <img  src={Logo} alt="job-hub" />,
//       }}
//     >
//       <DashboardLayout>
//         <DemoPageContent pathname={router.pathname} />
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// export default AppProviderBasic;
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

// Navigation Configuration
const NAVIGATION = [
  { kind: 'header', title: 'Overview' },
  { segment: 'dashboard', title: 'DASHBOARD', icon: <DashboardIcon /> },
  { segment: 'company', title: 'COMPANY', icon: <BusinessIcon /> },
  { segment: 'jobs', title: 'JOBS', icon: <WorkIcon /> },
  { segment: 'candidate', title: 'CANDIDATE', icon: <HailIcon /> },
  { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
];

// Theme Configuration
const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

// Utility Function to Check Active Segment
const isActive = (pathname, segment) => pathname === `/${segment}`;

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
    if (item.segment === 'logout' && item.title === 'Exit') {
      return {
        ...item,
        icon: React.cloneElement(item.icon, {
          onClick: () => {
            console.log("Logout icon clicked"); // Debugging if the icon is clicked
            handleLogout(); // Trigger the logout function
          },
        }),
        // Make the title (Exit) also clickable
        title: (
          <div
            style={{ padding: '10px' }}
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

    return item;
  });

  return (
    <AppProvider
      navigation={navigationWithActiveIcons}
      router={router}
      theme={demoTheme}
      branding={{
        title: <Typography className="text-2xl">JOB HUB <sup>admin</sup></Typography>,
        logo: <img className='logo' src={Logo} alt="job-hub" />,
      }}
    >
      <DashboardLayout>
        {renderPage()}
      </DashboardLayout>
    </AppProvider>
  );
}

export default AppProviderBasic;


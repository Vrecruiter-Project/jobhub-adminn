import { createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import HailIcon from '@mui/icons-material/Hail';
import { useDemoRouter } from '@toolpad/core/internal';
import Logo from '/logo.png';
import BarChart from './charts';
import { useTheme } from '@mui/material/styles'; // Import MUI's useTheme hook
import DashboardIcon from '@mui/icons-material/Dashboard';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Overview',
    },
    {
        segment: 'Dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
  },
  
{
  segment: 'company',
  title: 'Company',
  icon: <BusinessIcon />,
  },
  {
    segment: 'Jobs',
    title: 'Jobs',
    icon: <WorkIcon />,
},

  {
    segment: 'canditate',
    title: 'Canditate',
    icon: <HailIcon />,
  },
 
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }) {
  const theme = useTheme(); // Get the current theme

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>{pathname}</Typography>
      <BarChart theme={theme} /> {/* Pass the current theme to the BarChart */}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function AppProviderBasic() {
  const router = useDemoRouter('/Dashboard');

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        title: (
          <Typography  className="text-green-400">
            Job Hub <sup>admin</sup>
          </Typography>
        ),
        logo: <img src={Logo} alt="job-hub" />,
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default AppProviderBasic;

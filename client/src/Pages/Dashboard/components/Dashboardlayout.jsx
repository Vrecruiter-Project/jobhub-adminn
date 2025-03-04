import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import HailIcon from '@mui/icons-material/Hail';


const NAVIGATION = [
  { title: 'Main items', kind: 'header' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'Jobs', title: 'Jobs', icon: <WorkIcon /> },
  { segment: 'Companies', title: 'Companies', icon: <BusinessIcon /> },
  { segment: 'Candidates', title: 'Candidates', icon: <HailIcon /> },

];

const theme = createTheme();

function DemoPageContent({ pathname }) {
  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic() {
  const router = useDemoRouter('/dashboard');

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={theme}>
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;
import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import NoticesComponets from './NoticesComponets'
import FeesCollection from './FeesCollection'
import FeesHistory from './FeesHistory'
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import ViewGalleryImage from '../../components/ViewGalleryImage';
import { AppBar, Drawer } from '../../components/styles';
import styled from 'styled-components';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <DashboardContainer>
            <CssBaseline />
            <StyledAppBar open={open} position="absolute">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '16px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Student Dashboard
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent" open={open}>
                <Toolbar>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                    Nick Name infotech
                </Toolbar>
                
                <Divider />
                <List component="nav">
                    <StudentSideBar />
                </List>
            </StyledDrawer>
            <MainContent>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<StudentHomePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/Student/dashboard" element={<StudentHomePage />} />
                    <Route path="/Student/profile" element={<StudentProfile />} />
                    <Route path="/Student/subjects" element={<StudentSubjects />} />
                    <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                    <Route path="/Student/complain" element={<StudentComplain />} />
                    <Route path="/Student/notices" element={<NoticesComponets />} />
                    <Route path="/Student/feesCollection" element={<FeesCollection />} />
                    <Route path="/Student/viewFeesDetails" element={<FeesHistory />} />
                    <Route path="/Student/ViewGallery" element={<ViewGalleryImage address = "galleries"/>} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </MainContent>
        </DashboardContainer>
    );
};

export default StudentDashboard;

// 🎨 Styled Components for Enhanced UI
const DashboardContainer = styled(Box)`
    display: flex;
    height: 100vh;
`;

const StyledAppBar = styled(AppBar)`
    background: linear-gradient(135deg, #1976d2, #43a047);
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
`;

const StyledDrawer = styled(Drawer)`
    transition: width 0.3s ease-in-out;
    ${({ open }) => (!open ? `width: 70px;` : `width: 250px;`)}
    overflow-x: hidden;

    @media (max-width: 768px) {
        display: ${({ open }) => (!open ? 'none' : 'block')};
    }
`;

const MainContent = styled(Box)`
    background: ${(theme) =>
        theme.palette?.mode === 'light'
            ? theme.palette?.grey[100]
            : theme.palette?.grey[900]};
    flex-grow: 1;
    padding: 20px;
    transition: all 0.3s ease-in-out;
`;

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
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import NoticesComponents from './NoticesComponents'
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';
import styled from 'styled-components';

const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <DashboardContainer>
            <CssBaseline />
            <StyledAppBar open={open} position="absolute">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '16px', ...(open && { display: 'none' }) }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Teacher Dashboard
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent" open={open}>
                <Toolbar>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                    Nickname Infotech
                </Toolbar>
                <Divider />
                <List component="nav">
                    <TeacherSideBar />
                </List>
            </StyledDrawer>
            <MainContent>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<TeacherHomePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                    <Route path="/Teacher/profile" element={<TeacherProfile />} />
                    {/* <Route path="/Teacher/complain" element={<TeacherComplain />} /> */}
                    <Route path="/Teacher/notices" element={<NoticesComponents />} />
                    <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                    <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />
                    <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                    <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </MainContent>
        </DashboardContainer>
    );
};

export default TeacherDashboard;

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
    background: ${(theme) => theme.palette?.mode === 'light' ? theme.palette?.grey[100] : theme.palette?.grey[900]};
    flex-grow: 1;
    padding: 20px;
    transition: all 0.3s ease-in-out;
`;

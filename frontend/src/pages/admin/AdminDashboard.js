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
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

// Import all your components
import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';
import FeesHistory from '../../components/FeesHistory';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';

import UploadGallery from '../../components/AddGallery';
import ViewGalleryImage from '../../components/ViewGalleryImage';

import { styled } from '@mui/material/styles';
import Logo from '../../assets/img1.png';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
    zIndex: theme.zIndex.drawer + 1,
}));

const CompanyHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '& img': {
        width: 40,
        height: 40,
        objectFit: 'cover',
        borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'scale(1.1)',
            borderColor: 'rgba(255,255,255,0.5)',
        }
    },
    '& .company-name': {
        fontSize: '1.2rem',
        fontWeight: 600,
        marginLeft: theme.spacing(2),
        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
    width: theme.mixins.drawer?.width,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
        width: theme.mixins.drawer?.width,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#fff',
        boxShadow: '4px 0 20px 0 rgba(0,0,0,0.05)',
        border: 'none',
    },
}));

const AdminDashboard = () => {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <CssBaseline />
            <StyledAppBar position="fixed" open={open}>
                <Toolbar sx={{ 
                    height: 70,
                    px: { xs: 2, sm: 4 },
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            onClick={toggleDrawer}
                            sx={{
                                color: 'primary.main',
                                ...(open && { display: { sm: 'none' } }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h5"
                            sx={{ 
                                fontWeight: 700,
                                color: 'primary.main',
                                display: { xs: 'none', sm: 'block' },
                                letterSpacing: '-0.5px'
                            }}
                        >
                            School Dashboard
                        </Typography>
                    </Box>
                    <AccountMenu />
                </Toolbar>
            </StyledAppBar>

            <DrawerStyled variant="permanent" open={open}>
                <CompanyHeader>
                    <img src={Logo} alt="Company Logo" />
                    {open && (
                        <Typography className="company-name" noWrap>
                            Nickname Infotech
                        </Typography>
                    )}
                    <IconButton 
                        onClick={toggleDrawer}
                        sx={{ 
                            ml: 'auto',
                            color: 'white',
                            opacity: 0.9,
                            '&:hover': { opacity: 1, transform: 'scale(1.1)' },
                            display: { xs: 'none', sm: 'flex' }
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </CompanyHeader>
                <Divider />
                <Box sx={{ 
                    overflow: 'hidden',
                    flex: 1,
                    py: 2,
                    px: 1,
                    backgroundColor: '#fff',
                }}>
                    <List component="nav">
                        <SideBar />
                    </List>
                </Box>
            </DrawerStyled>

            <Box component="main" sx={{
                flexGrow: 1,
                p: { xs: 2, sm: 3, md: 4 },
                pt: { xs: '80px', sm: '90px' },
                backgroundColor: '#f8fafc',
                minHeight: '100vh',
                overflow: 'hidden',
                marginTop: '30px',
            }}>
                <Routes>
                    <Route path="/" element={<AdminHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                    <Route path="/Admin/profile" element={<AdminProfile />} />
                    <Route path="/Admin/complains" element={<SeeComplains />} />
                    <Route path="/Admin/feesHistory" element={<FeesHistory />} />

                    {/* Notice */}
                    <Route path="/Admin/addnotice" element={<AddNotice />} />
                    <Route path="/Admin/notices" element={<ShowNotices />} />

                    {/* Gallery */}
                    <Route path="/Admin/AddGallery" element={<UploadGallery />} />
                    <Route path="/Admin/ViewGallery" element={<ViewGalleryImage address="galleries"/>} />

                    {/* Subject */}
                    <Route path="/Admin/subjects" element={<ShowSubjects />} />
                    <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                    <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />
                    <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                    <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />
                    <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                    <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                    {/* Class */}
                    <Route path="/Admin/addclass" element={<AddClass />} />
                    <Route path="/Admin/classes" element={<ShowClasses />} />
                    <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                    <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                    {/* Student */}
                    <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                    <Route path="/Admin/students" element={<ShowStudents />} />
                    <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                    <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                    <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                    {/* Teacher */}
                    <Route path="/Admin/teachers" element={<ShowTeachers />} />
                    <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                    <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                    <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                    <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                    <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
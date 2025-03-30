import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useDispatch, useSelector } from 'react-redux';
import PaymentsIcon from '@mui/icons-material/Payments';

const SideBar = () => {
    const location = useLocation();
    const { currentUser, currentRole } = useSelector(state => state.user);

    const menuItems = [
        { to: "/", icon: <HomeIcon />, text: "Home", match: ["/", "/Admin/dashboard"] },
        { to: "/Admin/classes", icon: <ClassOutlinedIcon />, text: "Classes", match: ["/Admin/classes"] },
        { to: "/Admin/subjects", icon: <AssignmentIcon />, text: "Subjects", match: ["/Admin/subjects"] },
        { to: "/Admin/teachers", icon: <SupervisorAccountOutlinedIcon />, text: "Teachers", match: ["/Admin/teachers"] },
        { to: "/Admin/students", icon: <PersonOutlineIcon />, text: "Students", match: ["/Admin/students"] },
        { to: "/Admin/notices", icon: <AnnouncementOutlinedIcon />, text: "Notices", match: ["/Admin/notices"] },
        { to: "/Admin/feesHistory", icon: <PaymentsIcon />, text: "Fees Details", match: ["/Admin/feesHistory"] },
        { to: "/Admin/complains", icon: <ReportIcon />, text: "Complains", match: ["/Admin/complains"] },
        { to: "/Admin/ViewGallery", icon: <CollectionsIcon />, text: "Gallery", match: ["/Admin/ViewGallery"] },
    ];

    const supermenuItems = [
        { to: "/", icon: <HomeIcon />, text: "Home", match: ["/", "/Admin/dashboard"] },
        { to: "/Admin/Adminregister", icon: <AccountCircleOutlinedIcon />, text: "Create Schoool", match: ["/Admin/Adminregister"] },
        // { to: "/Admin/SchoolList", icon: <AccountCircleOutlinedIcon />, text: "Schools", match: ["/Admin/SchoolList"] },
    ];

    const userItems = [
        // { to: "/Admin/profile", icon: <AccountCircleOutlinedIcon />, text: "Profile", match: ["/Admin/profile"] },
        { to: "/logout", icon: <ExitToAppIcon />, text: "Logout", match: ["/logout"] },
    ];

    const renderMenuItems = (items) => (
        items.map(({ to, icon, text, match }) => (
            <ListItemButton 
                component={Link} 
                to={to} 
                key={text} 
                sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        transform: 'translateX(5px)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.light',
                        },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            height: '60%',
                            width: '4px',
                            backgroundColor: 'primary.main',
                            borderRadius: '0 4px 4px 0',
                        }
                    },
                }}
                selected={match.some(path => location.pathname.startsWith(path))}
            >
                <ListItemIcon sx={{
                    minWidth: 40,
                    color: match.some(path => location.pathname.startsWith(path)) ? 'primary.main' : 'inherit'
                }}>
                    {icon}
                </ListItemIcon>
                <ListItemText 
                    primary={
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                fontWeight: match.some(path => location.pathname.startsWith(path)) ? 600 : 400,
                                fontSize: '0.95rem'
                            }}
                        >
                            {text}
                        </Typography>
                    } 
                />
            </ListItemButton>
        ))
    );

    return (
        <Box sx={{ 
            p: 2,
            height: '100%',
            backgroundColor: 'background.paper',
            // borderRight: '1px solid',
            borderColor: 'divider'
        }}>
            <React.Fragment>
                {renderMenuItems(currentRole === "Admin" ? menuItems : supermenuItems)}
            </React.Fragment>
            <Divider sx={{ 
                my: 2,
                opacity: 0.7
            }} />
            <React.Fragment>
                <ListSubheader 
                    component="div" 
                    sx={{
                        backgroundColor: 'transparent',
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                        lineHeight: '2.5',
                        fontWeight: 600
                    }}
                >
                    User
                </ListSubheader>
                {renderMenuItems(userItems)}
            </React.Fragment>
        </Box>
    );
}

export default SideBar;

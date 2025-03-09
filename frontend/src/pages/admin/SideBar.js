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
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();
    const menuItems = [
        { to: "/", icon: <HomeIcon />, text: "Home", match: ["/", "/Admin/dashboard"] },
        { to: "/Admin/classes", icon: <ClassOutlinedIcon />, text: "Classes", match: ["/Admin/classes"] },
        { to: "/Admin/subjects", icon: <AssignmentIcon />, text: "Subjects", match: ["/Admin/subjects"] },
        { to: "/Admin/teachers", icon: <SupervisorAccountOutlinedIcon />, text: "Teachers", match: ["/Admin/teachers"] },
        { to: "/Admin/students", icon: <PersonOutlineIcon />, text: "Students", match: ["/Admin/students"] },
        { to: "/Admin/notices", icon: <AnnouncementOutlinedIcon />, text: "Notices", match: ["/Admin/notices"] },
        { to: "/Admin/complains", icon: <ReportIcon />, text: "Complains", match: ["/Admin/complains"] },
    ];

    const userItems = [
        { to: "/Admin/profile", icon: <AccountCircleOutlinedIcon />, text: "Profile", match: ["/Admin/profile"] },
        { to: "/logout", icon: <ExitToAppIcon />, text: "Logout", match: ["/logout"] },
    ];

    const renderMenuItems = (items) => (
        items.map(({ to, icon, text, match }) => (
            <ListItemButton 
                component={Link} 
                to={to} 
                key={text} 
                sx={{
                    borderRadius: 1,
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                        },
                    },
                }}
                selected={match.some(path => location.pathname.startsWith(path))}
            >
                <ListItemIcon>
                    {React.cloneElement(icon, { color: match.some(path => location.pathname.startsWith(path)) ? 'primary' : 'inherit' })}
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{text}</Typography>} />
            </ListItemButton>
        ))
    );

    return (
        <Box >
            <React.Fragment>
                {renderMenuItems(menuItems)}
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                {renderMenuItems(userItems)}
            </React.Fragment>
        </Box>
    );
}

export default SideBar;

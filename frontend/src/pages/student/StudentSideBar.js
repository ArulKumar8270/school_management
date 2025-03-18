import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import PaymentsIcon from '@mui/icons-material/Payments';
import CollectionsIcon from '@mui/icons-material/Collections';

const StudentSideBar = () => {
    const location = useLocation();

    return (
        <SidebarContainer>
            <SidebarItem component={Link} to="/">
                <StyledListItemIcon active={location.pathname === "/" || location.pathname === "/Student/dashboard"}>
                    <HomeIcon />
                </StyledListItemIcon>
                <ListItemText primary="Home" />
            </SidebarItem>
            <SidebarItem component={Link} to="/Student/subjects">
                <StyledListItemIcon active={location.pathname.startsWith("/Student/subjects")}>
                    <AssignmentIcon />
                </StyledListItemIcon>
                <ListItemText primary="Subjects" />
            </SidebarItem>
            <SidebarItem component={Link} to="/Student/attendance">
                <StyledListItemIcon active={location.pathname.startsWith("/Student/attendance")}>
                    <ClassOutlinedIcon />
                </StyledListItemIcon>
                <ListItemText primary="Attendance" />
            </SidebarItem>
            <SidebarItem component={Link} to="/Student/complain">
                <StyledListItemIcon active={location.pathname.startsWith("/Student/complain")}>
                    <AnnouncementOutlinedIcon />
                </StyledListItemIcon>
                <ListItemText primary="Complain" />
            </SidebarItem>
            <SidebarItem component={Link} to="/Student/notices">
                <StyledListItemIcon active={location.pathname.startsWith("/Student/notices")}>
                    <CircleNotificationsIcon />
                </StyledListItemIcon>
                <ListItemText primary="Notices" />
            </SidebarItem>
            <SidebarItem component={Link} to="/Student/feesCollection">
                <StyledListItemIcon active={location.pathname.startsWith("/Student/feesCollection")}>
                    <PaymentsIcon />
                </StyledListItemIcon>
                <ListItemText primary="Fees Collection" />
            </SidebarItem>
            <SidebarItem component={Link} to="/Student/viewFeesDetails">
                <StyledListItemIcon active={location.pathname.startsWith("/Student/viewFeesDetails")}>
                    <PaymentsIcon />
                </StyledListItemIcon>
                <ListItemText primary="Fees History" />
            </SidebarItem>
            <SidebarItem component={Link} to="/Student/ViewGallery">
                <StyledListItemIcon active={location.pathname.startsWith("/Student/ViewGallery")}>
                    <CollectionsIcon />
                </StyledListItemIcon>
                <ListItemText primary="Gallery" />
            </SidebarItem>
            <DividerStyled />
            <ListSubheaderStyled>User</ListSubheaderStyled>
            <SidebarItem component={Link} to="/Student/profile">
                <StyledListItemIcon active={location.pathname.startsWith("/Student/profile")}>
                    <AccountCircleOutlinedIcon />
                </StyledListItemIcon>
                <ListItemText primary="Profile" />
            </SidebarItem>
            <SidebarItem component={Link} to="/logout">
                <StyledListItemIcon active={location.pathname.startsWith("/logout")}>
                    <ExitToAppIcon />
                </StyledListItemIcon>
                <ListItemText primary="Logout" />
            </SidebarItem>
        </SidebarContainer>
    );
};

export default StudentSideBar;

// 🎨 Styled Components for Enhanced Sidebar UI
const SidebarContainer = styled.div`
    width: 100%;
    background: ${(props) => props.theme.palette?.background.default};
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const SidebarItem = styled(ListItemButton)`
    border-radius: 8px;
    margin: 5px 0;
    padding: 10px;
    transition: all 0.3s ease-in-out;
    
    &:hover {
        background: rgba(25, 118, 210, 0.1);
        transform: scale(1.02);
    }
`;

const StyledListItemIcon = styled(ListItemIcon)`
    color: ${(props) => (props.active ? "#1976d2" : "inherit")};
    transition: color 0.3s ease-in-out;
`;

const DividerStyled = styled(Divider)`
    margin: 10px 0;
`;

const ListSubheaderStyled = styled(ListSubheader)`
    font-weight: bold;
    font-size: 14px;
    color: #1976d2;
`;

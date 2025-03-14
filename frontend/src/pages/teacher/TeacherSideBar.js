import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;
    const location = useLocation();

    return (
        <SidebarContainer>
            <SidebarItem component={Link} to="/">
                <StyledListItemIcon active={location.pathname === "/" || location.pathname === "/Teacher/dashboard"}>
                    <HomeIcon />
                </StyledListItemIcon>
                <ListItemText primary="Home" />
            </SidebarItem>

            <SidebarItem component={Link} to="/Teacher/class">
                <StyledListItemIcon active={location.pathname.startsWith("/Teacher/class")}>
                    <ClassOutlinedIcon />
                </StyledListItemIcon>
                <ListItemText primary={`Class ${sclassName.sclassName}`} />
            </SidebarItem>

            <SidebarItem component={Link} to="/Teacher/complain">
                <StyledListItemIcon active={location.pathname.startsWith("/Teacher/complain")}>
                    <AnnouncementOutlinedIcon />
                </StyledListItemIcon>
                <ListItemText primary="Complain" />
            </SidebarItem>

            <DividerStyled />

            <ListSubheaderStyled>User</ListSubheaderStyled>

            <SidebarItem component={Link} to="/Teacher/profile">
                <StyledListItemIcon active={location.pathname.startsWith("/Teacher/profile")}>
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

export default TeacherSideBar;

// 🎨 Styled Components for Modern UI
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
    padding: 12px;
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

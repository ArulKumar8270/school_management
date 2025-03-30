import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Paper, Box, Container, CircularProgress, Backdrop, Typography
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (visitor === "guest") {
      const credentials = {
        Admin: { email: "yogendra@12", password },
        Student: { rollNum: "1", studentName: "Dipesh Awasthi", password },
        Teacher: { email: "tony@12", password }
      };
      setLoader(true);
      dispatch(loginUser(credentials[user], user));
    } else {
      navigate(`/${user}login`);
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === 'error') {
      setLoader(false);
      setMessage("🚫 Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          {userTypes.map(({ label, icon, role }) => (
            <Grid item xs={12} sm={6} md={4} key={role}>
              <UserCard onClick={() => navigateHandler(role)}>
                <IconContainer>{icon}</IconContainer>
                <Title>{label}</Title>
                <Description>{descriptions[role]}</Description>
              </UserCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
        <CircularProgress color="inherit" />
        <Typography variant="h6" sx={{ mt: 2 }}>Please Wait...</Typography>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f6f8fb 0%, #e9eef5 100%);
`;

const UserCard = styled(Paper)`
  padding: 2.5rem;
  text-align: center;
  border-radius: 24px;
  background: white !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2196f3, #64b5f6);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;

    &:before {
      transform: scaleX(1);
    }
  }
`;

const IconContainer = styled(Box)`
  margin-bottom: 1.5rem;
  color: #1976d2;
  
  .MuiSvgIcon-root {
    font-size: 3.5rem;
    transition: transform 0.3s ease;
  }

  ${UserCard}:hover & .MuiSvgIcon-root {
    transform: scale(1.1);
  }
`;

const Title = styled(Typography).attrs({ variant: "h5" })`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
`;

const Description = styled(Typography).attrs({ variant: "body2" })`
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 0.5rem;
`;

// 🔹 User Types
const userTypes = [
  { label: "Admin", icon: <AccountCircle fontSize="large" />, role: "Admin" },
  { label: "Student", icon: <School fontSize="large" />, role: "Student" },
  { label: "Teacher", icon: <Group fontSize="large" />, role: "Teacher" }
];

// 🔹 Descriptions
const descriptions = {
  Admin: "Manage app data & control settings.",
  Student: "Explore courses & assignments.",
  Teacher: "Create courses & track progress."
};

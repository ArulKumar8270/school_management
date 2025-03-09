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
  // background: linear-gradient(to bottom, #3a1c71, #d76d77, #ffaf7b);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const UserCard = styled(Paper)`
  padding: 25px;
  text-align: center;
  border-radius: 15px;
  background:#efefef !important;
  // backdrop-filter: blur(12px);
  box-shadow: rgba(0, 0, 0, 0.15) 14px 17px 6px !important;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.3);
  }
`;

const IconContainer = styled(Box)`
  font-size: 50px;
  margin-bottom: 10px;
`;

const Title = styled(Typography).attrs({ variant: "h5" })`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled(Typography).attrs({ variant: "body2" })`
  opacity: 0.8;
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

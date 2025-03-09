import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <StyledContainer maxWidth="md">
      <ProfileCard elevation={3}>
        <AvatarWrapper>
          <StyledAvatar alt="Student Avatar">
            {String(currentUser.name).charAt(0)}
          </StyledAvatar>
        </AvatarWrapper>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mt: 2 }}>
          {currentUser.name}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Roll No: <strong>{currentUser.rollNum}</strong>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Class: <strong>{sclassName.sclassName}</strong>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          School: <strong>{studentSchool.schoolName}</strong>
        </Typography>
      </ProfileCard>

      <InfoCard elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom className="gradient-text">
            📄 Personal Information
          </Typography>
          <Grid container spacing={2}>
            <InfoItem label="📅 Date of Birth" value="January 1, 2000" />
            <InfoItem label="👤 Gender" value="Male" />
            <InfoItem label="📧 Email" value="john.doe@example.com" />
            <InfoItem label="📞 Phone" value="(123) 456-7890" />
            <InfoItem label="🏠 Address" value="123 Main Street, City, Country" />
            <InfoItem label="🆘 Emergency Contact" value="(987) 654-3210" />
          </Grid>
        </CardContent>
      </InfoCard>
    </StyledContainer>
  );
};

export default StudentProfile;

// 🎨 Styled Components for Advanced UI
const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  padding: 40px;
  background: linear-gradient(135deg, rgba(227, 242, 253, 0.8), rgba(241, 248, 233, 0.8));
  backdrop-filter: blur(10px);
`;

const ProfileCard = styled(Paper)`
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const AvatarWrapper = styled(Box)`
  display: flex;
  justify-content: center;
`;

const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  font-size: 40px;
  font-weight: bold;
  background: linear-gradient(135deg, #1976d2, #43a047);
  color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);
  }
`;

const InfoCard = styled(Card)`
  width: 100%;
  max-width: 700px;
  padding: 25px;
  border-radius: 15px;
  margin-top: 20px;
  background: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const InfoItem = ({ label, value }) => (
  <Grid item xs={12} sm={6}>
    <Typography variant="subtitle1" component="p">
      <strong>{label}:</strong> {value}
    </Typography>
  </Grid>
);

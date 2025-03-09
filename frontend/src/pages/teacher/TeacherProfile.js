import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Avatar, Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) console.log(response);
  if (error) console.log(error);

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <ProfileContainer>
      <ProfileCard elevation={3}>
        <AvatarWrapper>
          <StyledAvatar alt="Teacher Avatar">
            {String(currentUser.name).charAt(0)}
          </StyledAvatar>
        </AvatarWrapper>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mt: 2 }}>
          {currentUser.name}
        </Typography>
        <ProfileDetails>
          <ProfileText><strong>Email:</strong> {currentUser.email}</ProfileText>
          <ProfileText><strong>Class:</strong> {teachSclass.sclassName}</ProfileText>
          <ProfileText><strong>Subject:</strong> {teachSubject.subName}</ProfileText>
          <ProfileText><strong>School:</strong> {teachSchool.schoolName}</ProfileText>
        </ProfileDetails>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default TeacherProfile;

// 🎨 Styled Components for Modern UI
const ProfileContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  background: linear-gradient(135deg, rgba(227, 242, 253, 0.8), rgba(241, 248, 233, 0.8));
  backdrop-filter: blur(10px);
`;

const ProfileCard = styled(Paper)`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.2);
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

const ProfileDetails = styled(Box)`
  margin-top: 20px;
`;

const ProfileText = styled(Typography)`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
`;

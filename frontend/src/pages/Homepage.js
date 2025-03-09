import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={3} alignItems="center">
                {/* Left Side Image */}
                <Grid item xs={12} md={6}>
                    <ImageWrapper>
                        <StyledImage src={Students} alt="students" />
                    </ImageWrapper>
                </Grid>

                {/* Right Side Content */}
                <Grid item xs={12} md={6}>
                    <ContentWrapper>
                        <StyledTitle>
                            Welcome to
                            <br />
                            <span>School Management</span>
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>
                            Streamline school management, organize classes, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </StyledText>
                        <StyledButtonContainer>
                            <StyledLink to="/choose">
                                <LoginButton variant="contained">
                                    Login
                                </LoginButton>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                                <GuestButton variant="outlined">
                                    Login as Guest
                                </GuestButton>
                            </StyledLink>
                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{ color: "#550080", fontWeight: "bold" }}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledButtonContainer>
                    </ContentWrapper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(135deg, rgba(227, 242, 253, 0.9), rgba(241, 248, 233, 0.9));
  backdrop-filter: blur(10px);
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledImage = styled.img`
  max-width: 90%;
  height: auto;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 500px;
  margin: auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 15px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTitle = styled.h1`
  font-size: 2.8rem;
  color: #252525;
  font-weight: bold;
  letter-spacing: normal;
  margin-bottom: 10px;
  span {
    color: #7f56da;
  }
`;

const StyledText = styled(Typography)`
  font-size: 1rem;
  color: #555;
  margin-top: 20px;
  line-height: 1.6;
`;

const StyledButtonContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LoginButton = styled(LightPurpleButton)`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  background: linear-gradient(135deg, #7f56da, #673ab7);

  &:hover {
    background: linear-gradient(135deg, #6a1b9a, #512da8);
    transform: translateY(-3px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const GuestButton = styled(Button)`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #7f56da;
  border: 2px solid #7f56da;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #7f56da;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

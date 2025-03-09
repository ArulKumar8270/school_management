import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { RedButton } from './buttonStyles';

const ErrorPage = () => {
    return (
        <StyledContainer>
            <StyledContent>
                <Typography variant="h4" component="h1" gutterBottom>
                    Oops, something went wrong
                </Typography>
                <Typography variant="body1" paragraph>
                    We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please check back later.
                </Typography>
                <RedButton variant="contained" onClick={() => window.location.reload()}>
                    Retry
                </RedButton>
            </StyledContent>
        </StyledContainer>
    );
};

const StyledContainer = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Josefin Sans", sans-serif;
  background-color: #f5f5f5;
  background-image: url('https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
`;

const StyledContent = styled.div`
  max-width: 600px;
  padding: 40px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default ErrorPage;

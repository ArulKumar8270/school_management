import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Container, Paper } from '@mui/material';
import { getAPI } from '../../redux/getApiRelated/getApiHandle';
import { useDispatch, useSelector } from 'react-redux';


const FeesHistory = () => {
  const { currentUser, userDetails } = useSelector((state) => state.user);
  const { listData, loading, error, response } = useSelector((state) => state.getAPI);

  const dispatch = useDispatch();
  const address = "fees";

  useEffect(() => {
    dispatch(getAPI(currentUser?._id, address));
}, [dispatch, currentUser?._id]);

  return (
    <StyledContainer maxWidth="md">
      {/* <ProfileCard elevation={3}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mt: 2 }}>
          {currentUser.name}'s Fees History
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Roll No: <strong>{currentUser.rollNum}</strong>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Class: <strong>{currentUser.sclassName?.sclassName}</strong>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          School: <strong>{currentUser.school?.schoolName}</strong>
        </Typography>
      </ProfileCard> */}

      <InfoCard elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom className="gradient-text">
            💰 Fees Payment History
          </Typography>
          <Grid container spacing={2}>
            {listData?.length > 0 ? (
              listData?.map((fee, index) => (
                <Grid item xs={12} key={index}>
                  <FeeItem>
                    <Typography variant="subtitle1">
                      <strong>📅 Date:</strong> {new Date(fee.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>💵 Amount Paid:</strong> {fee.amount}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>📝 Status:</strong> {"Paid"}
                    </Typography>
                  </FeeItem>
                </Grid>
              ))
            ) : (
              <Typography variant="subtitle1" align="center">
                No payment records found.
              </Typography>
            )}
          </Grid>
        </CardContent>
      </InfoCard>
    </StyledContainer>
  );
};

export default FeesHistory;

// 🎨 Styled Components for Advanced UI
const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
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

const InfoCard = styled(Card)`
  width: 100%;
  padding: 25px;
  border-radius: 15px;
  margin-top: 20px;
  background: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
`;

const FeeItem = styled(Box)`
  padding: 15px;
  border-radius: 10px;
  background: #f5f5f5;
  margin-bottom: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

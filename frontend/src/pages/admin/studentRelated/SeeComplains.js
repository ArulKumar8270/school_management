import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox, Typography, CircularProgress
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.error(error);
  }

  const complainColumns = [
    { id: 'user', label: '👤 User', minWidth: 170 },
    { id: 'complaint', label: '📜 Complaint', minWidth: 250 },
    { id: 'date', label: '📅 Date', minWidth: 170 },
  ];
  const complainRows = complainsList?.length > 0
    ? complainsList?.map((complain) => {
        const date = new Date(complain.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
          user: complain?.user?.name,
          complaint: complain?.complaint,
          date: dateString,
          id: complain?._id,
        };
      })
    : [];

  const ComplainButtonHaver = () => {
    return (
      <CheckboxContainer>
        <Checkbox color="primary" />
      </CheckboxContainer>
    );
  };

  return (
    <StyledContainer>
      {loading ? (
        <LoadingContainer>
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
            Loading Complaints...
          </Typography>
        </LoadingContainer>
      ) : response ? (
        <NoDataContainer>
          <Typography variant="h5" color="error">
            🚫 No Complaints Right Now
          </Typography>
        </NoDataContainer>
      ) : (
        <StyledPaper>
          {complainsList?.length > 0 ? (
            <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
          ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              No complaints available.
            </Typography>
          )}
        </StyledPaper>
      )}
    </StyledContainer>
  );
};

export default SeeComplains;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
    background: none !important;
`;

const StyledPaper = styled(Paper)`
    width: 100%;
    max-width: 1100px;
    padding: 20px;
    border-radius: 12px;
    box-shadow: none !important;
    background: none !important;
    transition: all 0.3s ease-in-out;
`;

const CheckboxContainer = styled(Box)`
    display: flex;
    justify-content: center;
`;

const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;

const NoDataContainer = styled(Box)`
    text-align: center;
    padding: 20px;
`;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox, Typography, CircularProgress, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { getUserDetails } from '../redux/userRelated/userHandle';
import TableTemplate from './TableTemplate';
import styled from 'styled-components';

const FeesHistory = () => {
  const dispatch = useDispatch();
  const { currentUser, userDetails, loading } = useSelector((state) => state.user);
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Fees"));
  }, [currentUser._id, dispatch]);

  const uniqueStudents = [...new Set(userDetails?.map(fee => fee.student?.name))];

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const groupedByClass = userDetails?.reduce((acc, fee) => {
    if (!acc[fee.class.sclassName]) acc[fee.class.sclassName] = [];
    acc[fee.class.sclassName].push(fee);
    return acc;
  }, {});

  const FeesCheckbox = () => (
    <CheckboxContainer>
      <Checkbox color="primary" />
    </CheckboxContainer>
  );

  return (
    <StyledContainer>
      {loading ? (
        <LoadingContainer>
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
            Loading Fees History...
          </Typography>
        </LoadingContainer>
      ) : userDetails?.length === 0 ? (
        <NoDataContainer>
          <Typography variant="h5" color="error">
            🚫 No Fees Records Found
          </Typography>
        </NoDataContainer>
      ) : (
        <StyledPaper>
                      <InputLabel>Filter by Student</InputLabel>

          <FormControl fullWidth hiddenLabel>
            <Select value={selectedStudent} onChange={handleStudentChange} displayEmpty>
              <MenuItem value="">All Students</MenuItem>
              {uniqueStudents.map((student, index) => (
                <MenuItem key={index} value={student}>{student}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {Object.keys(groupedByClass).map((className) => {
            const classFees = groupedByClass[className].filter(
              (fee) => !selectedStudent || fee.student.name === selectedStudent
            );

            if (classFees.length === 0) return null;

            const feesRows = classFees.map((fee) => {
              const date = new Date(fee.date);
              const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
              return {
                student: fee.student.name,
                school: fee.school.schoolName,
                class: fee.class.sclassName,
                amount: `$${fee.amount}`,
                paymentMethod: fee.paymentMethod,
                date: dateString,
                remarks: fee.remarks,
                id: fee._id,
              };
            });

            return (
              <Box key={className} sx={{ mt: 3 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  {className}
                </Typography>
                <TableTemplate buttonHaver={FeesCheckbox} columns={feesColumns} rows={feesRows} />
              </Box>
            );
          })}
        </StyledPaper>
      )}
    </StyledContainer>
  );
};

export default FeesHistory;

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
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

const feesColumns = [
    { id: 'student', label: '👤 Student', minWidth: 170 },
    { id: 'school', label: '🏫 School', minWidth: 200 },
    { id: 'class', label: '📚 Class', minWidth: 150 },
    { id: 'amount', label: '💰 Amount', minWidth: 150 },
    { id: 'paymentMethod', label: '💳 Payment Method', minWidth: 180 },
    { id: 'date', label: '📅 Date', minWidth: 170 },
    { id: 'remarks', label: '📝 Remarks', minWidth: 250 }
];
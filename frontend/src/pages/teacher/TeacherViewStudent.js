import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box, Button, Collapse, Table, TableBody, TableHead, Typography, Paper, CircularProgress
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';

const TeacherViewStudent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);

    const address = "Student";
    const studentID = params.id;
    const teachSubject = currentUser.teachSubject?.subName;
    const teachSubjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [subjectMarks, setSubjectMarks] = useState([]);
    const [openStates, setOpenStates] = useState({});

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <StyledContainer>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={50} />
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                        Loading Student Details...
                    </Typography>
                </LoadingContainer>
            ) : (
                <StyledPaper>
                    <Typography variant="h5" align="center" gutterBottom className="gradient-text">
                        📚 Student Profile
                    </Typography>
                    <ProfileInfo>
                        <Typography variant="h6"><strong>👤 Name:</strong> {userDetails?.name}</Typography>
                        <Typography variant="h6"><strong>📛 Roll Number:</strong> {userDetails?.rollNum}</Typography>
                        <Typography variant="h6"><strong>📖 Subject:</strong> {teachSubject}</Typography>
                    </ProfileInfo>

                    <Typography variant="h5" align="center" sx={{ mt: 3, mb: 2 }}>
                        Attendance Overview
                    </Typography>

                    {subjectAttendance.length > 0 && (
                        <>
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                if (subName === teachSubject) {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                    return (
                                        <TableWrapper key={index}>
                                            <Table>
                                                <TableHead>
                                                    <StyledTableRow>
                                                        <StyledTableCell>Subject</StyledTableCell>
                                                        <StyledTableCell>Present</StyledTableCell>
                                                        <StyledTableCell>Total Sessions</StyledTableCell>
                                                        <StyledTableCell>Attendance %</StyledTableCell>
                                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <StyledTableRow>
                                                        <StyledTableCell>{subName}</StyledTableCell>
                                                        <StyledTableCell>{present}</StyledTableCell>
                                                        <StyledTableCell>{sessions}</StyledTableCell>
                                                        <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <Button variant="contained" onClick={() => handleOpen(subId)}>
                                                                {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                                                            </Button>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <StyledTableRow>
                                                        <StyledTableCell colSpan={6}>
                                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                                <Box sx={{ margin: 1 }}>
                                                                    <Typography variant="h6" gutterBottom>Attendance Details</Typography>
                                                                    <Table size="small">
                                                                        <TableHead>
                                                                            <StyledTableRow>
                                                                                <StyledTableCell>Date</StyledTableCell>
                                                                                <StyledTableCell align="right">Status</StyledTableCell>
                                                                            </StyledTableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {allData.map((data, index) => {
                                                                                const date = new Date(data.date);
                                                                                return (
                                                                                    <StyledTableRow key={index}>
                                                                                        <StyledTableCell>{date.toISOString().substring(0, 10)}</StyledTableCell>
                                                                                        <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                                    </StyledTableRow>
                                                                                );
                                                                            })}
                                                                        </TableBody>
                                                                    </Table>
                                                                </Box>
                                                            </Collapse>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                </TableBody>
                                            </Table>
                                        </TableWrapper>
                                    );
                                }
                                return null;
                            })}

                            <Typography variant="h6" align="center" sx={{ mt: 3 }}>
                                📊 Overall Attendance Percentage: <strong>{overallAttendancePercentage.toFixed(2)}%</strong>
                            </Typography>

                            <CustomPieChart data={chartData} />
                        </>
                    )}

                    <ButtonWrapper>
                        <PurpleButton variant="contained" onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}>
                            Add Attendance
                        </PurpleButton>
                        <PurpleButton variant="contained" onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}>
                            Add Marks
                        </PurpleButton>
                    </ButtonWrapper>
                </StyledPaper>
            )}
        </StyledContainer>
    );
};

export default TeacherViewStudent;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
    padding: 30px;
    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
`;

const StyledPaper = styled(Paper)`
    max-width: 800px;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
    background: white;
`;

const ProfileInfo = styled(Box)`
    text-align: center;
    margin-bottom: 20px;
`;

const TableWrapper = styled(Box)`
    margin-top: 20px;
`;

const ButtonWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
`;

const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;

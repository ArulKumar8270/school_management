import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { Box, Button, Table, TableBody, TableContainer, TableHead, Typography, Tab, Paper, BottomNavigation, BottomNavigationAction, Container, CircularProgress } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart';
import CustomPieChart from '../../../components/CustomPieChart';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import styled from 'styled-components';

const ViewStudent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { userDetails, loading } = useSelector((state) => state.user);

    const studentID = params.id;
    const address = "Student";

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails?.sclassName?._id) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(userDetails?.attendance || []);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(userDetails?.attendance || [])).map(([subName, { present, sessions }]) => {
        return {
            subject: subName,
            attendancePercentage: calculateSubjectAttendancePercentage(present, sessions),
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <StyledTabContainer>
                            <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                                <Tab label="Details" value="1" />
                                <Tab label="Attendance" value="2" />
                                <Tab label="Marks" value="3" />
                            </TabList>
                        </StyledTabContainer>
                        <StyledCard>
                            <Container>
                                <TabPanel value="1">
                                    <Typography variant="h5" className="gradient-text">
                                        Student Details
                                    </Typography>
                                    <InfoRow>
                                        <Typography variant="h6">👤 Name:</Typography>
                                        <Typography variant="h6">{userDetails?.name}</Typography>
                                    </InfoRow>
                                    <InfoRow>
                                        <Typography variant="h6">📛 Roll Number:</Typography>
                                        <Typography variant="h6">{userDetails?.rollNum}</Typography>
                                    </InfoRow>
                                    <InfoRow>
                                        <Typography variant="h6">🏫 Class:</Typography>
                                        <Typography variant="h6">{userDetails?.sclassName?.sclassName}</Typography>
                                    </InfoRow>
                                    <InfoRow>
                                        <Typography variant="h6">🏫 School:</Typography>
                                        <Typography variant="h6">{userDetails?.school?.schoolName}</Typography>
                                    </InfoRow>
                                    {userDetails?.attendance?.length > 0 && (
                                        <CustomPieChart data={chartData} />
                                    )}
                                </TabPanel>
                                <TabPanel value="2">
                                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                                </TabPanel>
                                <TabPanel value="3">
                                    <Typography variant="h6">Subject Marks:</Typography>
                                    <Table>
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell>Subject</StyledTableCell>
                                                <StyledTableCell>Marks</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {userDetails?.examResult?.map((result, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell>{result.subName?.subName}</StyledTableCell>
                                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TabPanel>
                            </Container>
                        </StyledCard>
                    </TabContext>
                </Box>
            )}
        </StyledContainer>
    );
};

export default ViewStudent;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
`;

const StyledCard = styled(Paper)`
    width: 100%;
    max-width: 900px;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
    background: white;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 8px 22px rgba(0, 0, 0, 0.25);
    }
`;

const StyledTabContainer = styled(Box)`
    background: white;
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const InfoRow = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
`;

const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;


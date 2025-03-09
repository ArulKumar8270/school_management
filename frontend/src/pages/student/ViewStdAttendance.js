import React, { useEffect, useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Button, Collapse, Paper, Table, TableBody, TableHead, Typography, CircularProgress, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomBarChart from '../../components/CustomBarChart';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();
    const { userDetails, currentUser, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    const [openStates, setOpenStates] = useState({});
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance);
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { present, sessions }]) => ({
        subject: subName,
        attendancePercentage: calculateSubjectAttendancePercentage(present, sessions),
        totalClasses: sessions,
        attendedClasses: present
    }));

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => (
        <StyledCard elevation={3}>
            <Typography variant="h5" align="center" gutterBottom className="gradient-text">
                📊 Attendance Overview
            </Typography>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>📖 Subject</StyledTableCell>
                        <StyledTableCell>✅ Present</StyledTableCell>
                        <StyledTableCell>📅 Total Sessions</StyledTableCell>
                        <StyledTableCell>📊 Attendance %</StyledTableCell>
                        <StyledTableCell align="center">🔍 Details</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                    return (
                        <TableBody key={index}>
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
                                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Attendance Details
                                            </Typography>
                                            <Table size="small" aria-label="attendance details">
                                                <TableHead>
                                                    <StyledTableRow>
                                                        <StyledTableCell>Date</StyledTableCell>
                                                        <StyledTableCell align="right">Status</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {allData.map((data, index) => {
                                                        const date = new Date(data.date);
                                                        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                        return (
                                                            <StyledTableRow key={index}>
                                                                <StyledTableCell component="th" scope="row">
                                                                    {dateString}
                                                                </StyledTableCell>
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
                    );
                })}
            </Table>
            <Typography variant="h6" align="center" sx={{ mt: 3 }}>
                📊 Overall Attendance Percentage: <strong>{overallAttendancePercentage.toFixed(2)}%</strong>
            </Typography>
        </StyledCard>
    );

    const renderChartSection = () => (
        <StyledCard elevation={3}>
            <Typography variant="h5" align="center" gutterBottom className="gradient-text">
                📈 Attendance Statistics
            </Typography>
            <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
        </StyledCard>
    );

    return (
        <StyledContainer>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={50} />
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                        Loading Attendance...
                    </Typography>
                </LoadingContainer>
            ) : (
                <div>
                    {subjectAttendance.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}
                            <StyledBottomNavigation elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </StyledBottomNavigation>
                        </>
                    ) : (
                        <Typography variant="h6" gutterBottom component="div">
                            🚫 No Attendance Records Found
                        </Typography>
                    )}
                </div>
            )}
        </StyledContainer>
    );
};

export default ViewStdAttendance;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
    padding: 30px;
    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
`;

const StyledCard = styled(Paper)`
    max-width: 700px;
    width: 100%;
    padding: 20px;
    border-radius: 12px;
    background: white;
    transition: all 0.3s ease-in-out;
`;

const StyledBottomNavigation = styled(Paper)`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #1565c0, #43a047);
`;

const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;

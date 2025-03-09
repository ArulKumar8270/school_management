import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography, Card, CardContent, Box } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => (
        <StyledCard elevation={3}>
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom className="gradient-text">
                    📊 Subject Marks
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>📖 Subject</StyledTableCell>
                            <StyledTableCell>📊 Marks</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{result.subName?.subName}</StyledTableCell>
                                <StyledTableCell>{result.marksObtained}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </StyledCard>
    );

    const renderChartSection = () => (
        <StyledCard elevation={3}>
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom className="gradient-text">
                    📈 Marks Distribution
                </Typography>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
            </CardContent>
        </StyledCard>
    );

    const renderClassDetailsSection = () => (
        <StyledCard elevation={3}>
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom className="gradient-text">
                    🏫 Class Details
                </Typography>
                <Typography variant="h6" gutterBottom>
                    You are currently in Class: <strong>{sclassDetails?.sclassName}</strong>
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Subjects:
                </Typography>
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <Typography key={index} variant="subtitle1">
                            📚 {subject.subName} ({subject.subCode})
                        </Typography>
                    ))}
            </CardContent>
        </StyledCard>
    );

    return (
        <StyledContainer>
            {loading ? (
                <LoadingContainer>
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                        Loading Subjects...
                    </Typography>
                </LoadingContainer>
            ) : (
                <div>
                    {subjectMarks.length > 0 ? (
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
                        renderClassDetailsSection()
                    )}
                </div>
            )}
        </StyledContainer>
    );
};

export default StudentSubjects;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
    padding: 30px;
    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
`;

const StyledCard = styled(Card)`
    max-width: 600px;
    width: 100%;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    background: white;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 8px 22px rgba(0, 0, 0, 0.2);
    }
`;

const StyledBottomNavigation = styled(Paper)`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #1565c0, #43a047);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;

import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import SubjectIcon from "../../assets/subjects.svg";
import AssignmentIcon from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList?.length || 0;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <StyledContainer maxWidth="lg">
            <Grid container spacing={3}>
                {/* Total Subjects */}
                <Grid item xs={12} md={4} lg={3}>
                    <InfoCard>
                        <IconContainer>
                            <img src={SubjectIcon} alt="Subjects" />
                        </IconContainer>
                        <Title>Total Subjects</Title>
                        <CountUpValue start={0} end={numberOfSubjects} duration={2.5} />
                    </InfoCard>
                </Grid>

                {/* Total Assignments */}
                <Grid item xs={12} md={4} lg={3}>
                    <InfoCard>
                        <IconContainer>
                            <img src={AssignmentIcon} alt="Assignments" />
                        </IconContainer>
                        <Title>Total Assignments</Title>
                        <CountUpValue start={0} end={15} duration={4} />
                    </InfoCard>
                </Grid>

                {/* Attendance Chart */}
                <Grid item xs={12} md={4} lg={3}>
                    <ChartContainer>
                        {response ? (
                            <Typography variant="h6">No Attendance Found</Typography>
                        ) : (
                            <>
                                {loading ? (
                                    <Typography variant="h6">Loading...</Typography>
                                ) : (
                                    <>
                                        {subjectAttendance.length > 0 ? (
                                            <CustomPieChart data={chartData} />
                                        ) : (
                                            <Typography variant="h6">No Attendance Found</Typography>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </ChartContainer>
                </Grid>

                {/* Notices Section */}
                <Grid item xs={12}>
                    <StyledPaper>
                        <SeeNotice />
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default StudentHomePage;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Container)`
    min-height: 90vh;
    padding: 40px;
    background: linear-gradient(135deg, rgba(227, 242, 253, 0.8), rgba(241, 248, 233, 0.8));
    backdrop-filter: blur(10px);
`;

const InfoCard = styled(Paper)`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.03);
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15);
    }
`;

const IconContainer = styled.div`
    width: 50px;
    height: 50px;
    margin-bottom: 8px;
`;

const Title = styled(Typography).attrs({
    variant: "h6",
})`
    font-weight: bold;
    margin-bottom: 8px;
`;

const CountUpValue = styled(CountUp)`
    font-size: calc(1.3rem + .6vw);
    color: green;
    font-weight: bold;
`;

const ChartContainer = styled(Paper)`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 240px;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.03);
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15);
    }
`;

const StyledPaper = styled(Paper)`
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.03);
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15);
    }
`;

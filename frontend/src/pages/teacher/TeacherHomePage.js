import { Container, Grid, Paper, Typography } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import StudentsIcon from "../../assets/img1.png";
import LessonsIcon from "../../assets/subjects.svg";
import TestsIcon from "../../assets/assignment.svg";
import TimeIcon from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents?.length || 0;
    const numberOfSessions = subjectDetails?.sessions || 0;

    return (
        <StyledContainer maxWidth="lg">
            <Grid container spacing={3}>
                {/* Class Students */}
                <Grid item xs={12} md={6} lg={3}>
                    <StatCard>
                        <StatIcon src={StudentsIcon} alt="Students" />
                        <StatTitle>Class Students</StatTitle>
                        <StatData start={0} end={numberOfStudents} duration={2.5} />
                    </StatCard>
                </Grid>

                {/* Total Lessons */}
                <Grid item xs={12} md={6} lg={3}>
                    <StatCard>
                        <StatIcon src={LessonsIcon} alt="Lessons" />
                        <StatTitle>Total Lessons</StatTitle>
                        <StatData start={0} end={numberOfSessions} duration={5} />
                    </StatCard>
                </Grid>

                {/* Tests Taken */}
                <Grid item xs={12} md={6} lg={3}>
                    <StatCard>
                        <StatIcon src={TestsIcon} alt="Tests" />
                        <StatTitle>Tests Taken</StatTitle>
                        <StatData start={0} end={24} duration={4} />
                    </StatCard>
                </Grid>

                {/* Total Hours */}
                <Grid item xs={12} md={6} lg={3}>
                    <StatCard>
                        <StatIcon src={TimeIcon} alt="Time" />
                        <StatTitle>Total Hours</StatTitle>
                        <StatData start={0} end={30} duration={4} suffix=" hrs" />
                    </StatCard>
                </Grid>

                {/* Notices Section */}
                <Grid item xs={12}>
                    <NoticeCard>
                        <SeeNotice />
                    </NoticeCard>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default TeacherHomePage;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Container)`
    min-height: 90vh;
    padding: 40px;
    background: linear-gradient(135deg, rgba(227, 242, 253, 0.8), rgba(241, 248, 233, 0.8));
    backdrop-filter: blur(10px);
`;

const StatCard = styled(Paper)`
    padding: 20px;
    text-align: center;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.2);
    }
`;

const StatIcon = styled.img`
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
`;

const StatTitle = styled(Typography).attrs({ variant: "h6" })`
    font-weight: bold;
    margin-bottom: 8px;
`;

const StatData = styled(CountUp)`
    font-size: 1.5rem;
    color: #1976d2;
    font-weight: bold;
`;

const NoticeCard = styled(Paper)`
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.03);
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.2);
    }
`;

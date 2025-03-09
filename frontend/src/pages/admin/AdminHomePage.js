import { Container, Grid, Paper, Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import { styled } from '@mui/system';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <DashboardContainer>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <StyledCard>
                            <CardContent>
                                <IconContainer>
                                    <CardMedia
                                        component="img"
                                        image={Students}
                                        alt="Students"
                                        sx={{ width: 70, height: 70 }}
                                    />
                                </IconContainer>
                                <StatsContent>
                                    <StatLabel variant="h6">Total Students</StatLabel>
                                    <StatValue>
                                        <CountUp start={0} end={numberOfStudents} duration={2.5} />
                                    </StatValue>
                                </StatsContent>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StyledCard>
                            <CardContent>
                                <IconContainer>
                                    <CardMedia
                                        component="img"
                                        image={Classes}
                                        alt="Classes"
                                        sx={{ width: 70, height: 70 }}
                                    />
                                </IconContainer>
                                <StatsContent>
                                    <StatLabel variant="h6">Total Classes</StatLabel>
                                    <StatValue>
                                        <CountUp start={0} end={numberOfClasses} duration={2.5} />
                                    </StatValue>
                                </StatsContent>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StyledCard>
                            <CardContent>
                                <IconContainer>
                                    <CardMedia
                                        component="img"
                                        image={Teachers}
                                        alt="Teachers"
                                        sx={{ width: 70, height: 70 }}
                                    />
                                </IconContainer>
                                <StatsContent>
                                    <StatLabel variant="h6">Total Teachers</StatLabel>
                                    <StatValue>
                                        <CountUp start={0} end={numberOfTeachers} duration={2.5} />
                                    </StatValue>
                                </StatsContent>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StyledCard>
                            <CardContent>
                                <IconContainer>
                                    <CardMedia
                                        component="img"
                                        image={Fees}
                                        alt="Fees"
                                        sx={{ width: 70, height: 70 }}
                                    />
                                </IconContainer>
                                <StatsContent>
                                    <StatLabel variant="h6">Fees Collection</StatLabel>
                                    <StatValue>
                                        <CountUp start={0} end={23000} duration={2.5} prefix="$" />
                                    </StatValue>
                                </StatsContent>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12}>
                        <NoticeContainer>
                            <SeeNotice />
                        </NoticeContainer>
                    </Grid>
                </Grid>
            </Container>
        </DashboardContainer>
    );
};

const DashboardContainer = styled(Box)`
    padding: 2rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
`;

const StyledCard = styled(Card)`
    background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
    border-radius: 15px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    position: relative;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #2196f3, #00bcd4);
    }
`;

const IconContainer = styled(Box)`
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
`;

const StatsContent = styled(Box)`
    text-align: center;
`;

const StatLabel = styled(Typography)`
    color: #37474f;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const StatValue = styled(Typography)`
    background: linear-gradient(90deg, #2196f3, #00bcd4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const NoticeContainer = styled(Paper)`
    padding: 2.5rem;
    border-radius: 20px;
    background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #2196f3, #00bcd4);
    }
`;

export default AdminHomePage
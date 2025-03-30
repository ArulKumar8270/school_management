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
import { getAPI } from '../../redux/getApiRelated/getApiHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import SchoolList from '../admin/reportRelated/SchoolList'
const AdminHomePage = (props) => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { listData, loading, error, response } = useSelector((state) => state.getAPI);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAPI("?role=Admin","Admin"));
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;
    const numberOfSchools = listData && listData.length;

    return (
        <DashboardContainer>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {props?.role === "superadmin" ?
                        // <Grid item xs={12} md={4}>
                        //     <StyledCard>
                        //         <CardContent>
                        //             <IconContainer>
                        //                 <CardMedia
                        //                     component="img"
                        //                     image={Teachers}
                        //                     alt="Teachers"
                        //                     sx={{ width: 70, height: 70 }}
                        //                 />
                        //             </IconContainer>
                        //             <StatsContent>
                        //                 <StatLabel variant="h6">Total School</StatLabel>
                        //                 <StatValue>
                        //                     <CountUp start={0} end={numberOfSchools} duration={2.5} />
                        //                 </StatValue>
                        //             </StatsContent>
                        //         </CardContent>
                        //     </StyledCard>
                        // </Grid>
                        <SchoolList />
                    : <>
                     <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                    </> }
                   

                    {/* <Grid item xs={12} md={3}>
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
                    </Grid> */}
                    {props?.role !== "superadmin" ? <Grid item xs={12}>
                        <NoticeContainer>
                            <SeeNotice />
                        </NoticeContainer>
                    </Grid> : null}
                </Grid>
            </Container>
        </DashboardContainer>
    );
};

const DashboardContainer = styled(Box)`
    padding: 2rem;
    background: linear-gradient(135deg, #f6f9fc 0%, #e9ecef 100%);
    min-height: 100vh;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
        z-index: 0;
    }
`;

const StyledCard = styled(Card)`
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 1;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
    }
`;

const IconContainer = styled(Box)`
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;

    img {
        transition: transform 0.3s ease;
    }
`;

// const StyledCard = styled(Card)`
//     background: rgba(255, 255, 255, 0.95);
//     border-radius: 20px;
//     transition: all 0.3s ease;
//     backdrop-filter: blur(10px);
//     border: 1px solid rgba(255, 255, 255, 0.2);
//     position: relative;
//     z-index: 1;
    
//     &:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
//     }

//     &:hover ${IconContainer} img {
//         transform: scale(1.1);
//     }
// `;

const StatsContent = styled(Box)`
    text-align: center;
    padding: 0 1rem;
`;

const StatLabel = styled(Typography)`
    color: #64748b;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const StatValue = styled(Typography)`
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
`;

const NoticeContainer = styled(Paper)`
    padding: 2rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 1;
    
    &:hover {
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
    }
`;

export default AdminHomePage
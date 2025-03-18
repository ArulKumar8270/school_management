import { Container, Grid, Paper, Box, Button, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails } from '../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { BlueButton, GreenButton, PurpleButton } from "./buttonStyles";

const ViewGalleryImage = ({ address }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, currentRole } = useSelector(state => state.user)
    const navigate = useNavigate();

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser?.school?._id || adminID, address));
    }, [adminID, dispatch]);

    return (
        <DashboardContainer>
            <Container maxWidth="lg">
                {currentRole !== "Student" ?  <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                    <GreenButton variant="contained" onClick={() => navigate("/Admin/AddGallery")}>
                        ➕ Update Galllery
                    </GreenButton>
                </Box> : null}
                <Grid container spacing={0.5}>
                    {Array.isArray(userDetails) && userDetails.length > 0 && (
                        userDetails
                            ?.filter((gallery) => {
                                const role = currentRole.toLowerCase();
                                const noticeType = gallery.showTo?.toLowerCase();
                                return role === "admin" || noticeType === "all" || noticeType === role;
                            })
                            .flatMap((item) =>
                                item?.images?.map((image) => (
                                    <Grid item xs={12} md={6} lg={2} key={image.url}>
                                        <CardContent>
                                            <IconContainer>
                                                <CardMedia
                                                    component="img"
                                                    image={`${process.env.REACT_APP_BASE_URL}/${image?.url}`}
                                                    alt="Students"
                                                    sx={{ width: "100%", height: "100px" }}
                                                    onClick={() => window.open(`${process.env.REACT_APP_BASE_URL}/${image?.url}`, "_blank")}
                                                />
                                            </IconContainer>
                                        </CardContent>
                                    </Grid>
                                ))
                            )
                    )}
                </Grid>
            </Container>
        </DashboardContainer>
    );
};

const DashboardContainer = styled(Box)`
    padding: 2rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 87vh;
`;


const IconContainer = styled(Box)`
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
`;


export default ViewGalleryImage
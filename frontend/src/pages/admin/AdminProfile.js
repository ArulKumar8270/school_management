import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <ProfileContainer>
            <ProfileCard>
                <AvatarContainer>
                    <Avatar alt={currentUser.name} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100 }} />
                </AvatarContainer>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {currentUser.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                        Email: {currentUser.email}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        School: {currentUser.schoolName}
                    </Typography>
                </CardContent>
            </ProfileCard>
        </ProfileContainer>
    );
}

export default AdminProfile;
const ProfileContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const ProfileCard = styled(Card)`
    max-width: 400px;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
`;

const AvatarContainer = styled(Box)`
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
`;

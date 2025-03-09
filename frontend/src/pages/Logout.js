import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutWrapper>
            <LogoutCard>
                <UserName>{currentUser.name}</UserName>
                <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
                <ButtonGroup>
                    <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                </ButtonGroup>
            </LogoutCard>
        </LogoutWrapper>
    );
};

export default Logout;

// 🎨 Styled Components for Enhanced UI
const LogoutWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    background: linear-gradient(135deg, rgba(227, 242, 253, 0.8), rgba(241, 248, 233, 0.8));
    backdrop-filter: blur(10px);
`;

const LogoutCard = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.2);
    }
`;

const UserName = styled.h1`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const LogoutMessage = styled.p`
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`;

const ButtonBase = styled.button`
    padding: 12px 20px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    }
`;

const LogoutButton = styled(ButtonBase)`
    background: linear-gradient(135deg, #e53935, #b71c1c);
    color: white;

    &:hover {
        background: linear-gradient(135deg, #c62828, #8e0000);
    }
`;

const CancelButton = styled(ButtonBase)`
    background: linear-gradient(135deg, #1976d2, #1565c0);
    color: white;

    &:hover {
        background: linear-gradient(135deg, #1565c0, #0d47a1);
    }
`;

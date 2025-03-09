import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, Grid, Box, Typography, Paper, TextField, CssBaseline,
    IconButton, InputAdornment, CircularProgress, Backdrop
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg";
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true);

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                setLoader(false);
                return;
            }

            const fields = { rollNum, studentName, password };
            dispatch(loginUser(fields, role));
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                setLoader(false);
                return;
            }

            const fields = { email, password };
            dispatch(loginUser(fields, role));
        }
    };

    const guestModeHandler = () => {
        setGuestLoader(true);
        const password = "zxc";

        const loginCredentials = {
            Admin: { email: "yogendra@12", password },
            Student: { rollNum: "1", studentName: "Dipesh Awasthi", password },
            Teacher: { email: "tony@12", password }
        };

        dispatch(loginUser(loginCredentials[role], role));
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            navigate(`/${currentRole}/dashboard`);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <LoginContainer>
            <CssBaseline />
            <Overlay />
            <LoginFormContainer>
                <LoginCard elevation={6}>
                    <Typography variant="h4" sx={{ mb: 3, color: "#2c2143", fontWeight: 'bold' }}>
                        {role} Login
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center', color: "#666", mb: 4 }}>
                        Welcome back! Please enter your details.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormFieldContainer>
                            {role === "Student" ? (
                                <>
                                    <CustomTextField
                                        required
                                        fullWidth
                                        id="rollNumber"
                                        label="Enter your Roll Number"
                                        name="rollNumber"
                                        type="number"
                                        autoFocus
                                        error={rollNumberError}
                                        helperText={rollNumberError && 'Roll Number is required'}
                                    />
                                    <CustomTextField
                                        required
                                        fullWidth
                                        id="studentName"
                                        label="Enter your Name"
                                        name="studentName"
                                        error={studentNameError}
                                        helperText={studentNameError && 'Name is required'}
                                    />
                                </>
                            ) : (
                                <CustomTextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your Email"
                                    name="email"
                                    autoComplete="email"
                                    error={emailError}
                                    helperText={emailError && 'Email is required'}
                                />
                            )}
                            <CustomTextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormFieldContainer>
                        <LoginButton type="submit" fullWidth>
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
                        </LoginButton>
                        <GuestButton fullWidth onClick={guestModeHandler}>
                            Login as Guest
                        </GuestButton>
                    </form>
                </LoginCard>
            </LoginFormContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </LoginContainer>
    );
};

export default LoginPage;

// 🎨 Styled Components for Modern UI
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url(${bgpic}) no-repeat center center/cover;
    position: relative;
`;

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`;

const LoginFormContainer = styled.div`
    position: relative;
    z-index: 2;
    backdrop-filter: blur(12px);
    padding: 40px;
    border-radius: 10px;
`;

const LoginCard = styled(Paper)`
    padding: 35px;
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(15px);
    border-radius: 12px;
    box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15);
`;

const FormFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const LoginButton = styled(Button)`
    margin-top: 20px;
    background: linear-gradient(135deg, #7f56da, #673ab7);
    color: white;
    padding: 14px;
    font-weight: bold;

    &:hover {
        background: linear-gradient(135deg, #6a1b9a, #512da8);
    }
`;

const GuestButton = styled(Button)`
    margin-top: 10px;
    background: #f1f1f1;
    color: #673ab7;
    padding: 14px;
    font-weight: bold;
    border: 1px solid #673ab7;

    &:hover {
        background: #e1e1e1;
    }
`;

const CustomTextField = styled(TextField)`
    margin-bottom: 15px;
`;

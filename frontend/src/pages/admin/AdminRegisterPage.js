import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, Grid, Box, Typography, Paper, TextField, CssBaseline,
    IconButton, InputAdornment, CircularProgress, Checkbox, FormControlLabel
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/designlogin.jpg";
import styled from 'styled-components';
import { registerUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';

const AdminRegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true);

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            setLoader(false);
            return;
        }

        const fields = { name, email, password, role, schoolName };
        dispatch(registerUser(fields, role)).then(() => {
            setLoader(false)
            navigate('/')
        });
    };

    // useEffect(() => {
    //     if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
    //         navigate('/Admin/dashboard');
    //     } else if (status === 'failed') {
    //         setMessage(response);
    //         setShowPopup(true);
    //         setLoader(false);
    //     } else if (status === 'error') {
    //         console.log(error);
    //     }
    // }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <RegisterContainer>
            <CssBaseline />
            <Overlay />
            <RegisterFormContainer>
                <RegisterCard elevation={6}>
                    <Typography variant="h4" sx={{ mb: 3, color: "#2c2143", fontWeight: 'bold' }}>
                        School Register
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center', color: "#666", mb: 4 }}>
                        Create your own school by registering as an admin. <br />
                        You will be able to add students and faculty and manage the system.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormFieldContainer>
                            <CustomTextField
                                required
                                fullWidth
                                id="adminName"
                                label="Enter your Name"
                                name="adminName"
                                autoFocus
                                error={adminNameError}
                                helperText={adminNameError && 'Name is required'}
                            />
                            <CustomTextField
                                required
                                fullWidth
                                id="schoolName"
                                label="Create your School Name"
                                name="schoolName"
                                autoComplete="off"
                                error={schoolNameError}
                                helperText={schoolNameError && 'School name is required'}
                            />
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
                        <RegisterButton type="submit" fullWidth>
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
                        </RegisterButton>
                        {/* <Typography align="center" sx={{ mt: 2 }}>
                            Already have an account?{' '}
                            <StyledLink to="/Adminlogin">
                                Log in
                            </StyledLink>
                        </Typography> */}
                    </form>
                </RegisterCard>
            </RegisterFormContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </RegisterContainer>
    );
};

export default AdminRegisterPage;

// 🎨 Styled Components
const RegisterContainer = styled.div`
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

const RegisterFormContainer = styled.div`
    position: relative;
    z-index: 2;
    backdrop-filter: blur(12px);
    padding: 40px;
    border-radius: 10px;
`;

const RegisterCard = styled(Paper)`
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
`;

const RegisterButton = styled(Button)`
    margin-top: 20px;
    background: linear-gradient(135deg, #7f56da, #673ab7);
    color: white;
    padding: 14px;
    font-weight: bold;

    &:hover {
        background: linear-gradient(135deg, #6a1b9a, #512da8);
    }
`;

const CustomTextField = styled(TextField)`
    margin-bottom: 15px !important;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #7f56da;
    font-weight: bold;
`;

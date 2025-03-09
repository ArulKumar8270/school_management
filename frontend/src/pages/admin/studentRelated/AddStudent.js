import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress, Card, CardContent, Typography, TextField, Button, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        const selectedClass = sclassesList.find(
            (classItem) => classItem.sclassName === event.target.value
        );
        setClassName(selectedClass?.sclassName || '');
        setSclassName(selectedClass?._id || '');
    };

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

    const submitHandler = (event) => {
        event.preventDefault();
        if (sclassName === "") {
            setMessage("⚠️ Please select a class name");
            setShowPopup(true);
        } else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("🚫 Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <FormContainer>
            <StyledCard elevation={3}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom className="gradient-text">
                        ➕ Add Student
                    </Typography>
                    <form onSubmit={submitHandler}>
                        <FieldContainer>
                            <CustomTextField
                                fullWidth
                                label="👤 Student's Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </FieldContainer>

                        {situation === "Student" && (
                            <FieldContainer>
                                <CustomSelect fullWidth value={className} onChange={changeHandler} required>
                                    <MenuItem value="">Select Class</MenuItem>
                                    {sclassesList.map((classItem, index) => (
                                        <MenuItem key={index} value={classItem.sclassName}>
                                            {classItem.sclassName}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </FieldContainer>
                        )}

                        <FieldContainer>
                            <CustomTextField
                                fullWidth
                                label="📛 Roll Number"
                                type="number"
                                variant="outlined"
                                value={rollNum}
                                onChange={(e) => setRollNum(e.target.value)}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <CustomTextField
                                fullWidth
                                label="🔑 Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FieldContainer>

                        <SubmitButton type="submit" disabled={loader}>
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Add Student"}
                        </SubmitButton>
                    </form>
                </CardContent>
            </StyledCard>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </FormContainer>
    );
};

export default AddStudent;

// 🎨 Styled Components for Modern UI
const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
    padding: 30px;
`;

const StyledCard = styled(Card)`
    max-width: 480px;
    width: 100%;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    background: white;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 8px 22px rgba(0, 0, 0, 0.2);
    }
`;

const FieldContainer = styled.div`
    margin-bottom: 18px;
`;

const SubmitButton = styled(Button)`
    width: 100%;
    margin-top: 15px;
    background: linear-gradient(135deg, #1976d2, #43a047);
    color: white;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    padding: 12px;

    &:hover {
        background: linear-gradient(135deg, #1565c0, #388e3c);
        transform: translateY(-2px);
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

const CustomTextField = styled(TextField)`
    & .MuiInputLabel-root {
        color: #555;
        font-size: 14px;
    }

    & .MuiOutlinedInput-root {
        border-radius: 10px;
        transition: all 0.3s ease-in-out;

        &:hover {
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        }

        &.Mui-focused {
            border-color: #1976d2;
            box-shadow: 0px 0px 10px rgba(25, 118, 210, 0.3);
        }
    }
`;

const CustomSelect = styled(Select)`
    width: 100%;
    border-radius: 10px;
    padding: 10px;
`;

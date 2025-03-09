import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import {
    Box, InputLabel, MenuItem, Select, Typography, Stack, TextField,
    CircularProgress, FormControl, Card, CardContent, Button
} from '@mui/material';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            dispatch(getUserDetails(params.id, "Student"));
        } else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails?.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find((subject) => subject.subName === event.target.value);
        setSubjectName(selectedSubject?.subName || '');
        setChosenSubName(selectedSubject?._id || '');
    };

    const fields = { subName: chosenSubName, status, date };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"));
    };

    useEffect(() => {
        if (response) {
            setLoader(false);
            setShowPopup(true);
            setMessage(response);
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("⚠️ Error occurred");
        } else if (statestatus === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("✅ Attendance Added Successfully");
        }
    }, [response, statestatus, error]);

    return (
        <FormContainer>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={50} />
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                        Loading Student Data...
                    </Typography>
                </LoadingContainer>
            ) : (
                <StyledCard elevation={3}>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom className="gradient-text">
                            📝 Mark Student Attendance
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mb: 3, color: "#666" }}>
                            Assign attendance status for {userDetails?.name}
                        </Typography>
                        <form onSubmit={submitHandler}>
                            <FieldContainer>
                                <CustomTextField fullWidth label="👤 Student Name" variant="outlined" value={userDetails?.name} disabled />
                            </FieldContainer>

                            {situation === "Student" && (
                                <FieldContainer>
                                    <CustomSelect fullWidth value={subjectName} onChange={changeHandler} required>
                                        <MenuItem value="">Select Subject</MenuItem>
                                        {subjectsList.map((subject, index) => (
                                            <MenuItem key={index} value={subject.subName}>
                                                {subject.subName}
                                            </MenuItem>
                                        ))}
                                    </CustomSelect>
                                </FieldContainer>
                            )}

                            <FieldContainer>
                                <CustomSelect fullWidth value={status} onChange={(event) => setStatus(event.target.value)} required>
                                    <MenuItem value="Present">✅ Present</MenuItem>
                                    <MenuItem value="Absent">❌ Absent</MenuItem>
                                </CustomSelect>
                            </FieldContainer>

                            <FieldContainer>
                                <CustomTextField
                                    fullWidth
                                    label="📅 Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </FieldContainer>

                            <SubmitButton type="submit" disabled={loader}>
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                            </SubmitButton>
                        </form>
                    </CardContent>
                </StyledCard>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </FormContainer>
    );
};

export default StudentAttendance;

// 🎨 Styled Components for Modern UI
const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
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
const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;

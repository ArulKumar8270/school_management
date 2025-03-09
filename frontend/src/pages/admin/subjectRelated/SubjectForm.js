import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, Card, CardContent } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';
import styled from "styled-components";

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <StyledContainer>
            <StyledCard elevation={3}>
                <CardContent>
                    <FormTitle>📚 Add Subjects</FormTitle>
                    <form onSubmit={submitHandler} className="mt-2">
                        <Grid container spacing={2}>
                            {subjects?.map((subject, index) => (
                                <React.Fragment key={index}>
                                    <Grid item xs={12} sm={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="Subject Name"
                                            variant="outlined"
                                            value={subject.subName}
                                            onChange={handleSubjectNameChange(index)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <CustomTextField
                                            fullWidth
                                            label="Subject Code"
                                            variant="outlined"
                                            value={subject.subCode}
                                            onChange={handleSubjectCodeChange(index)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <CustomTextField
                                            fullWidth
                                            label="Sessions"
                                            variant="outlined"
                                            type="number"
                                            inputProps={{ min: 0 }}
                                            value={subject.sessions}
                                            onChange={handleSessionsChange(index)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonContainer>
                                            {index === 0 ? (
                                                <AddButton variant="outlined" onClick={handleAddSubject}>
                                                    ➕ Add Subject
                                                </AddButton>
                                            ) : (
                                                <RemoveButton variant="outlined" onClick={handleRemoveSubject(index)}>
                                                    ❌ Remove
                                                </RemoveButton>
                                            )}
                                        </ButtonContainer>
                                    </Grid>
                                </React.Fragment>
                            ))}
                            <Grid item xs={12}>
                                <SubmitButtonContainer>
                                    <SubmitButton type="submit" disabled={loader}>
                                        {loader ? <CircularProgress size={24} color="inherit" /> : "Save"}
                                    </SubmitButton>
                                </SubmitButtonContainer>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </StyledCard>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
}

export default SubjectForm;

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    background: linear-gradient(135deg, rgba(227, 242, 253, 0.8), rgba(241, 248, 233, 0.8));
    backdrop-filter: blur(10px);
`;

const StyledCard = styled(Card)`
    max-width: 650px;
    width: 100%;
    padding: 30px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.2);
    }
`;

const FormTitle = styled(Typography).attrs({ variant: "h5", align: "center" })`
    font-weight: bold;
    margin-bottom: 20px !important;
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

const ButtonContainer = styled(Box)`
    display: flex;
    justify-content: space-between;
`;

const AddButton = styled(Button)`
    // background: linear-gradient(135deg, #1976d2, #43a047);
    color: white;
    transition: all 0.3s ease-in-out;

    &:hover {
        // background: linear-gradient(135deg, #1565c0, #388e3c);
        transform: scale(1.05);
    }
`;

const RemoveButton = styled(Button)`
    // background: linear-gradient(135deg, #d32f2f, #c2185b);
    color: white;
    transition: all 0.3s ease-in-out;

    &:hover {
        // background: linear-gradient(135deg, #b71c1c, #880e4f);
        transform: scale(1.05);
    }
`;

const SubmitButtonContainer = styled(Box)`
    display: flex;
    justify-content: flex-end;
`;

const SubmitButton = styled(Button)`
    background: linear-gradient(135deg, #673ab7, #512da8);
    color: white !important;
    padding: 12px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    width: 100%;

    &:hover {
        background: linear-gradient(135deg, #5e35b1, #4527a0);
        transform: scale(1.05);
    }
`;
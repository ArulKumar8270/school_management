import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, CircularProgress, Paper } from '@mui/material';
import styled from 'styled-components';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <StyledContainer>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={50} />
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                        Loading Teacher Details...
                    </Typography>
                </LoadingContainer>
            ) : (
                <StyledPaper elevation={3}>
                    <Typography variant="h4" align="center" gutterBottom>
                        👩‍🏫 Teacher Details
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <strong>👤 Name:</strong> {teacherDetails?.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <strong>🏫 Class:</strong> {teacherDetails?.teachSclass?.sclassName}
                    </Typography>
                    {isSubjectNamePresent ? (
                        <>
                            <Typography variant="h6" gutterBottom>
                                <strong>📘 Subject:</strong> {teacherDetails?.teachSubject?.subName}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <strong>🕒 Sessions:</strong> {teacherDetails?.teachSubject?.sessions}
                            </Typography>
                        </>
                    ) : (
                        <ButtonContainer>
                            <AddSubjectButton variant="contained" onClick={handleAddSubject}>
                                ➕ Add Subject
                            </AddSubjectButton>
                        </ButtonContainer>
                    )}
                </StyledPaper>
            )}
        </StyledContainer>
    );
};

export default TeacherDetails;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
`;

const StyledPaper = styled(Paper)`
    width: 100%;
    max-width: 600px;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    background: white;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const AddSubjectButton = styled(Button)`
    background: linear-gradient(135deg, #1976d2, #43a047);
    color: white;
    font-weight: bold;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: linear-gradient(135deg, #1565c0, #388e3c);
        transform: translateY(-2px);
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;

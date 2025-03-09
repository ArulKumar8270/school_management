import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import styled from 'styled-components';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false);

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            dispatch(getTeacherFreeClassSubjects(params.id));
        } else if (situation === "Teacher") {
            const { classID, teacherID } = params;
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation, params, dispatch]);

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true);
        dispatch(updateTeachSubject(teacherId, teachSubject));
        navigate("/Admin/teachers");
    };

    return (
        <Container>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={50} />
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                        Loading Subjects...
                    </Typography>
                </LoadingContainer>
            ) : response ? (
                <EmptyStateContainer>
                    <Typography variant="h5" color="error">
                        Sorry, all subjects have teachers assigned already.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <PurpleButton variant="contained" onClick={() => navigate(`/Admin/addsubject/${classID}`)}>
                            ➕ Add Subjects
                        </PurpleButton>
                    </Box>
                </EmptyStateContainer>
            ) : (
                <StyledPaper>
                    <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
                        Choose a Subject
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell align="center">#</StyledTableCell>
                                    <StyledTableCell align="center">📘 Subject Name</StyledTableCell>
                                    <StyledTableCell align="center">📌 Subject Code</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                                    subjectsList.map((subject, index) => (
                                        <StyledTableRow key={subject._id}>
                                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                            <StyledTableCell align="center">{subject.subName}</StyledTableCell>
                                            <StyledTableCell align="center">{subject.subCode}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {situation === "Norm" ? (
                                                    <GreenButton variant="contained" onClick={() => navigate(`/Admin/teachers/addteacher/${subject._id}`)}>
                                                        Choose
                                                    </GreenButton>
                                                ) : (
                                                    <GreenButton variant="contained" disabled={loader} onClick={() => updateSubjectHandler(teacherID, subject._id)}>
                                                        {loader ? <CircularProgress size={20} color="inherit" /> : "Choose Subject"}
                                                    </GreenButton>
                                                )}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                ) : (
                                    <StyledTableRow>
                                        <StyledTableCell colSpan={4} align="center">
                                            <Typography variant="body1" color="textSecondary">
                                                No subjects available.
                                            </Typography>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </StyledPaper>
            )}
        </Container>
    );
};

export default ChooseSubject;

// 🎨 Styled Components for Modern UI
const Container = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
`;

const StyledPaper = styled(Paper)`
    width: 100%;
    max-width: 900px;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    background: white;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
    }
`;

const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;

const EmptyStateContainer = styled(Box)`
    text-align: center;
    padding: 20px;
`;


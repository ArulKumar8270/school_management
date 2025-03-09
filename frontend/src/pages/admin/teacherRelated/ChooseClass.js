import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Typography, Paper } from '@mui/material';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.error(error);
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate(`/Admin/teachers/choosesubject/${classID}`);
        } else if (situation === "Subject") {
            navigate(`/Admin/addsubject/${classID}`);
        }
    };

    const sclassColumns = [
        { id: 'name', label: '🏫 Class Name', minWidth: 170 },
    ];

    const sclassRows = sclassesList?.length > 0
        ? sclassesList.map((sclass) => ({
            name: sclass.sclassName,
            id: sclass._id,
        }))
        : [];

    const SclassButtonHaver = ({ row }) => (
        <PurpleButton variant="contained" onClick={() => navigateHandler(row.id)}>
            Choose
        </PurpleButton>
    );

    return (
        <Container>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={50} />
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                        Loading Classes...
                    </Typography>
                </LoadingContainer>
            ) : (
                <StyledPaper elevation={3}>
                    <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
                        Choose a Class
                    </Typography>
                    {getresponse && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                            <AddClassButton variant="contained" onClick={() => navigate("/Admin/addclass")}>
                                ➕ Add Class
                            </AddClassButton>
                        </Box>
                    )}
                    {sclassRows.length > 0 ? (
                        <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                    ) : (
                        <Typography variant="h6" align="center" color="textSecondary">
                            No classes available.
                        </Typography>
                    )}
                </StyledPaper>
            )}
        </Container>
    );
};

export default ChooseClass;

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

const AddClassButton = styled(Button)`
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

const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;


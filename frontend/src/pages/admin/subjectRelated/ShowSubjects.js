import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import {
    Paper, Box, IconButton, CircularProgress, Typography, Tooltip,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.error(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("🚫 Sorry, the delete function has been disabled for now.");
        // dispatch(deleteUser(deleteID, address)).then(() => {
        //     dispatch(getSubjectList(currentUser._id, "AllSubjects"));
        // });
        setShowPopup(true);
    };

    const subjectColumns = [
        { id: 'subName', label: '📘 Subject Name', minWidth: 170 },
        { id: 'sessions', label: '🕒 Sessions', minWidth: 170 },
        { id: 'sclassName', label: '🏫 Class', minWidth: 170 },
    ];

    const subjectRows = subjectsList.map((subject) => ({
        subName: subject.subName,
        sessions: subject.sessions,
        sclassName: subject.sclassName.sclassName,
        sclassID: subject.sclassName._id,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <ButtonContainer>
            <Tooltip title="Delete Subject">
                <IconButton onClick={() => deleteHandler(row.id, "Subject")} color="error">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <BlueButton variant="contained" onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}>
                View
            </BlueButton>
        </ButtonContainer>
    );

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass"),
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects"),
        },
    ];

    return (
        <Container>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={50} />
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                        Loading Subjects...
                    </Typography>
                </LoadingContainer>
            ) : (
                <>
                    {/* {response ? ( */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/subjects/chooseclass")}>
                                ➕ Add Subjects
                            </GreenButton>
                        </Box>
                    {/* ) : ( */}
                        <StyledPaper>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 && (
                                <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                            )}
                            <SpeedDialTemplate actions={actions} />
                        </StyledPaper>
                    {/* )} */}
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default ShowSubjects;

// 🎨 Styled Components for Better UI
const Container = styled(Box)`
    padding: 20px;
    // background: #f9f9f9;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledPaper = styled(Paper)`
    width: 100%;
    // max-width: 1200px;
    // padding: 20px;
    border-radius: 12px;
    // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    // background: transparent;
    // transition: all 0.3s ease-in-out;

    // &:hover {
    //     box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.2);
    // }
`;

const ButtonContainer = styled(Box)`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
`;


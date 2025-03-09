import { useEffect, useState, useRef } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import {
    Paper, Box, Typography, ButtonGroup, Button, Popper, Grow,
    ClickAwayListener, MenuList, MenuItem, CircularProgress
} from '@mui/material';
import { BlackButton, BlueButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import styled from 'styled-components';

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector((state) => state.user);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.error(error);
    }

    const studentColumns = [
        { id: 'name', label: '👩‍🎓 Name', minWidth: 170 },
        { id: 'rollNum', label: '📛 Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents?.length > 0
        ? sclassStudents.map((student) => ({
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        }))
        : [];

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];

        const [open, setOpen] = useState(false);
        const anchorRef = useRef(null);
        const [selectedIndex, setSelectedIndex] = useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
            } else if (selectedIndex === 1) {
                navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
            }
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <ButtonContainer>
                <BlueButton variant="contained" onClick={() => navigate(`/Teacher/class/student/${row.id}`)}>
                    View
                </BlueButton>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                    <BlackButton size="small" aria-controls={open ? 'split-button-menu' : undefined} aria-expanded={open ? 'true' : undefined} onClick={handleToggle}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </BlackButton>
                </ButtonGroup>
                <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {options.map((option, index) => (
                                            <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </ButtonContainer>
        );
    };

    return (
        <StyledContainer>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={50} />
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                        Loading Class Details...
                    </Typography>
                </LoadingContainer>
            ) : (
                <StyledPaper>
                    <Typography variant="h5" align="center" gutterBottom className="gradient-text">
                        📚 Class Details
                    </Typography>
                    {getresponse ? (
                        <Typography variant="h6" align="center" color="textSecondary">
                            🚫 No Students Found
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="h6" gutterBottom>
                                👨‍🎓 Students List:
                            </Typography>
                            {sclassStudents?.length > 0 ? (
                                <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                            ) : (
                                <Typography variant="body1" align="center" color="textSecondary">
                                    No students available.
                                </Typography>
                            )}
                        </>
                    )}
                </StyledPaper>
            )}
        </StyledContainer>
    );
};

export default TeacherClassDetails;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
    padding: 30px;
    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
`;

const StyledPaper = styled(Paper)`
    width: 100%;
    max-width: 900px;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
    background: white;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 8px 22px rgba(0, 0, 0, 0.25);
    }
`;

const ButtonContainer = styled(Box)`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;

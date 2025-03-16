import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import {
    Paper, Box, IconButton, CircularProgress, Typography, ButtonGroup, Button, ClickAwayListener,
    Grow, Popper, MenuItem, MenuList
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlackButton, BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import Popup from '../../../components/Popup';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import styled from 'styled-components';

const ShowStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.error(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        // setMessage("🚫 Sorry, the delete function has been disabled for now.");
        // setShowPopup(true);
        dispatch(deleteUser(deleteID, address)).then(() => {
            dispatch(getAllStudents(currentUser._id));
        });
    };

    const studentColumns = [
        { id: 'name', label: '👩‍🎓 Name', minWidth: 170 },
        { id: 'rollNum', label: '📛 Roll Number', minWidth: 100 },
        { id: 'sclassName', label: '🏫 Class', minWidth: 170 },
    ];

    const studentRows = studentsList?.length > 0
        ? studentsList.map((student) => ({
            name: student.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName.sclassName,
            id: student._id,
        }))
        : [];

    const StudentButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                navigate(`/Admin/students/student/attendance/${row.id}`);
            } else if (selectedIndex === 1) {
                navigate(`/Admin/students/student/marks/${row.id}`);
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
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton variant="contained" onClick={() => navigate(`/Admin/students/student/${row.id}`)}>
                    View
                </BlueButton>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                    <BlackButton
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
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

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            name: 'Add New Student',
            action: () => navigate("/Admin/addstudents"),
        },
        {
            icon: <PersonRemoveIcon color="error" />,
            name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id, "Students"),
        },
    ];

    return (
        <StyledContainer>
              {loading ? (
                    <LoadingContainer>
                        <CircularProgress size={50} />
                        <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                            Loading Students...
                        </Typography>
                    </LoadingContainer>
                ) : (
                    <StyledPaper>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")}>
                                ➕ Add Students
                            </GreenButton>
                        </Box>
                        {Array.isArray(studentsList) && studentsList.length > 0 && (
                            <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                        )}
                        <SpeedDialTemplate actions={actions} />
                    </StyledPaper>
                )}

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
};

export default ShowStudents;

// 🎨 Styled Components for Modern UI
const StyledContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
`;

const StyledPaper = styled(Paper)`
    width: 100%;
    max-width: 1100px;
    padding: 20px;
    border-radius: 12px;
    box-shadow: none !important;
    background: none !important;
    transition: all 0.3s ease-in-out;
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

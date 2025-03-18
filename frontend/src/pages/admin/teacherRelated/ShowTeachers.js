import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper, CircularProgress, TablePagination, Button, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("🚫 Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
        // dispatch(deleteUser(deleteID, address)).then(() => {
        //     dispatch(getAllTeachers(currentUser._id));
        // });
    };

    const columns = [
        { id: 'name', label: '👩‍🏫 Name', minWidth: 170 },
        { id: 'teachSubject', label: '📘 Subject', minWidth: 100 },
        { id: 'teachSclass', label: '🏫 Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => ({
        name: teacher.name,
        teachSubject: teacher.teachSubject?.subName || null,
        teachSclass: teacher.teachSclass.sclassName,
        teachSclassID: teacher.teachSclass._id,
        id: teacher._id,
    }));

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass"),
        },
        {
            icon: <PersonRemoveIcon color="error" />,
            name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers"),
        },
    ];

    return (
        <Container>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={50} />
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                        Loading Teachers...
                    </Typography>
                </LoadingContainer>
            ) : response ? (
                <EmptyStateContainer>
                    <Typography variant="h5" color="error">
                        No teachers found.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/chooseclass")}>
                            ➕ Add Teacher
                        </GreenButton>
                    </Box>
                </EmptyStateContainer>
            ) : (
                <StyledPaper>
                    <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
                        List of Teachers
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    {columns.map((column) => (
                                        <StyledTableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </StyledTableCell>
                                    ))}
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {rows.length > 0 ? (
                                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <StyledTableRow key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <StyledTableCell key={column.id} align="center">
                                                        {column.id === 'teachSubject' && !value ? (
                                                            <Button variant="contained" onClick={() => navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)}>
                                                                Add Subject
                                                            </Button>
                                                        ) : (
                                                            value
                                                        )}
                                                    </StyledTableCell>
                                                );
                                            })}
                                            <StyledTableCell align="center">
                                                <Tooltip title="Remove Teacher">
                                                    <IconButton onClick={() => deleteHandler(row.id, "Teacher")} color="error">
                                                        <PersonRemoveIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <BlueButton variant="contained" onClick={() => navigate(`/Admin/teachers/teacher/${row.id}`)}>
                                                    View
                                                </BlueButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                ) : (
                                    <StyledTableRow>
                                        <StyledTableCell colSpan={4} align="center">
                                            <Typography variant="body1" color="textSecondary">
                                                No teachers available.
                                            </Typography>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 5));
                            setPage(0);
                        }}
                    />
                    <SpeedDialTemplate actions={actions} />
                </StyledPaper>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default ShowTeachers;

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
    max-width: 1100px;
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

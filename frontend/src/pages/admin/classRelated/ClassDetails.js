import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box, Container, Typography, Tab, IconButton, CircularProgress, Card, CardContent, Divider, Paper
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import styled from 'styled-components';
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id;

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("🚫 Sorry, the delete function is disabled for now.");
        setShowPopup(true);
    };

    return (
        <>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={60} />
                    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>Loading class details...</Typography>
                </LoadingContainer>
            ) : (
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <StyledTabContainer>
                        <TabContext value={value}>
                            <Paper elevation={3} className="tab-header">
                                <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                                    <Tab label="📋 Details" value="1" />
                                    <Tab label="📚 Subjects" value="2" />
                                    <Tab label="👩‍🎓 Students" value="3" />
                                </TabList>
                            </Paper>

                            <StyledContainer>
                                <TabPanel value="1">
                                    <DetailsCard>
                                        <Typography variant="h4" className="gradient-text">
                                            Class Details
                                        </Typography>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="h5">Class: <b>{sclassDetails?.sclassName}</b></Typography>
                                        <Typography variant="h6">📘 Subjects: {subjectsList.length}</Typography>
                                        <Typography variant="h6">🎓 Students: {sclassStudents.length}</Typography>
                                        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                                            {getresponse && (
                                                <GreenButton variant="contained" onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}>
                                                    ➕ Add Students
                                                </GreenButton>
                                            )}
                                            {response && (
                                                <BlueButton variant="contained" onClick={() => navigate(`/Admin/addsubject/${classID}`)}>
                                                    ➕ Add Subjects
                                                </BlueButton>
                                            )}
                                        </Box>
                                    </DetailsCard>
                                </TabPanel>

                                <TabPanel value="2">
                                    <SectionTitle>📚 Subjects</SectionTitle>
                                    <TableTemplate columns={[{ id: 'name', label: 'Subject Name' }, { id: 'code', label: 'Code' }]} 
                                        rows={subjectsList.map(sub => ({ name: sub.subName, code: sub.subCode, id: sub._id }))}
                                        buttonHaver={({ row }) => (
                                            <>
                                                <IconButton onClick={() => deleteHandler(row.id, "Subject")} color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                                <BlueButton onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}>View</BlueButton>
                                            </>
                                        )}
                                    />
                                    <SpeedDialTemplate actions={[
                                        { icon: <PostAddIcon color="primary" />, name: "Add Subject", action: () => navigate(`/Admin/addsubject/${classID}`) },
                                        { icon: <DeleteIcon color="error" />, name: "Delete All", action: () => deleteHandler(classID, "SubjectsClass") }
                                    ]} />
                                </TabPanel>

                                <TabPanel value="3">
                                    <SectionTitle>👩‍🎓 Students</SectionTitle>
                                    <TableTemplate columns={[{ id: 'name', label: 'Name' }, { id: 'rollNum', label: 'Roll No' }]} 
                                        rows={sclassStudents.map(student => ({ name: student.name, rollNum: student.rollNum, id: student._id }))}
                                        buttonHaver={({ row }) => (
                                            <>
                                                <IconButton onClick={() => deleteHandler(row.id, "Student")} color="error">
                                                    <PersonRemoveIcon />
                                                </IconButton>
                                                <BlueButton onClick={() => navigate(`/Admin/students/student/${row.id}`)}>View</BlueButton>
                                                <PurpleButton onClick={() => navigate(`/Admin/students/student/attendance/${row.id}`)}>Attendance</PurpleButton>
                                            </>
                                        )}
                                    />
                                    <SpeedDialTemplate actions={[
                                        { icon: <PersonAddAlt1Icon color="primary" />, name: "Add Student", action: () => navigate(`/Admin/class/addstudents/${classID}`) },
                                        { icon: <PersonRemoveIcon color="error" />, name: "Delete All", action: () => deleteHandler(classID, "StudentsClass") }
                                    ]} />
                                </TabPanel>
                            </StyledContainer>
                        </TabContext>
                    </StyledTabContainer>
                </Box>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;

// 🖌 Styled Components
const StyledContainer = styled(Container)`
    margin-top: 20px;
    padding-bottom: 20px;
`;

const StyledTabContainer = styled(Box)`
    // background: white;
    position: sticky;
    top: 0;
    z-index: 10;
    // box-shadow: 0 2px 10px rgba(0,0,0,0.15);
`;

const DetailsCard = styled(Card)`
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    .gradient-text {
        background: linear-gradient(90deg, #2196f3, #4caf50);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const SectionTitle = styled(Typography).attrs({ variant: "h5", gutterBottom: true })`
    font-weight: bold;
    color: #1565c0;
    margin-bottom: 10px;
`;

const LoadingContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`;

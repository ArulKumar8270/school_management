import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Tab,
  Container,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from '@mui/material';
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import styled from 'styled-components';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => setValue(newValue);

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => setSelectedSection(newSection);

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id,
  }));

  const StudentsAttendanceButtonHaver = ({ row }) => (
    <>
      <BlueButton variant="contained" onClick={() => navigate(`/Admin/students/student/${row.id}`)}>
        View
      </BlueButton>
      <PurpleButton variant="contained" onClick={() => navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)}>
        Take Attendance
      </PurpleButton>
    </>
  );

  const StudentsMarksButtonHaver = ({ row }) => (
    <>
      <BlueButton variant="contained" onClick={() => navigate(`/Admin/students/student/${row.id}`)}>
        View
      </BlueButton>
      <PurpleButton variant="contained" onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}>
        Provide Marks
      </PurpleButton>
    </>
  );

  return (
    <>
      {subloading ? (
        <LoadingContainer>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>Loading Subject Details...</Typography>
        </LoadingContainer>
      ) : (
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <StyledTabContainer>
              <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                <Tab label="📋 Details" value="1" />
                <Tab label="👩‍🎓 Students" value="2" />
              </TabList>
            </StyledTabContainer>

            <StyledContainer>
              <TabPanel value="1">
                <DetailsCard>
                  <Typography variant="h4" className="gradient-text">
                    Subject Details
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h5">📘 Subject Name: <b>{subjectDetails?.subName}</b></Typography>
                  <Typography variant="h6">📌 Subject Code: {subjectDetails?.subCode}</Typography>
                  <Typography variant="h6">📅 Sessions: {subjectDetails?.sessions}</Typography>
                  <Typography variant="h6">🎓 Students Enrolled: {sclassStudents.length}</Typography>
                  <Typography variant="h6">🏫 Class Name: {subjectDetails?.sclassName?.sclassName}</Typography>
                  {subjectDetails?.teacher ? (
                    <Typography variant="h6">👨‍🏫 Teacher: {subjectDetails.teacher.name}</Typography>
                  ) : (
                    <GreenButton variant="contained" onClick={() => navigate(`/Admin/teachers/addteacher/${subjectDetails._id}`)}>
                      ➕ Add Subject Teacher
                    </GreenButton>
                  )}
                </DetailsCard>
              </TabPanel>

              <TabPanel value="2">
                <SectionTitle>👩‍🎓 Students</SectionTitle>
                {selectedSection === 'attendance' && (
                  <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
                )}
                {selectedSection === 'marks' && (
                  <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
                )}

                <StyledBottomNavigation>
                  <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                    <BottomNavigationAction label="Attendance" value="attendance"
                      icon={selectedSection === 'attendance' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                    />
                    <BottomNavigationAction label="Marks" value="marks"
                      icon={selectedSection === 'marks' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                    />
                  </BottomNavigation>
                </StyledBottomNavigation>
              </TabPanel>
            </StyledContainer>
          </TabContext>
        </Box>
      )}
    </>
  );
};

export default ViewSubject;

// 🎨 Styled Components
const StyledContainer = styled(Container)`
  margin-top: 20px;
  padding-bottom: 20px;
`;

const StyledTabContainer = styled(Box)`
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
`;

const StyledBottomNavigation = styled(Paper)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
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

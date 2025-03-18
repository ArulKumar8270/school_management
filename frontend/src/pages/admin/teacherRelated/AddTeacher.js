import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import styled from 'styled-components';

const AddTeacher = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectID = params.id;
  const { status, response } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const role = "Teacher";
  const school = subjectDetails?.school;
  const teachSubject = subjectDetails?._id;
  const teachSclass = subjectDetails?.sclassName?._id;
  const fields = { name, email, password, role, school, teachSubject, teachSclass };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate("/Admin/teachers");
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("🚫 Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, response, dispatch]);

  return (
    <FormContainer>
      <StyledCard elevation={3}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            ➕ Add Teacher
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 2, color: "#555" }}>
            Assign a teacher to the subject and class.
          </Typography>
          <form onSubmit={submitHandler}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
              Subject: {subjectDetails?.subName}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 2 }}>
              Class: {subjectDetails?.sclassName?.sclassName}
            </Typography>
            <FieldContainer>
              <CustomTextField fullWidth label="Teacher's Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </FieldContainer>
            <FieldContainer>
              <CustomTextField fullWidth label="Teacher's Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FieldContainer>
            <FieldContainer>
              <CustomTextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FieldContainer>
            <SubmitButton type="submit" disabled={loader}>
              {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </SubmitButton>
          </form>
        </CardContent>
      </StyledCard>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </FormContainer>
  );
};

export default AddTeacher;

// 🎨 Styled Components for a Modern UI
const FormContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
  padding: 20px;
`;

const StyledCard = styled(Card)`
  max-width: 450px;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  background: white;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
  background: linear-gradient(135deg, #1976d2, #43a047);
  color: white;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  padding: 10px;

  &:hover {
    background: linear-gradient(135deg, #1565c0, #388e3c);
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const FieldContainer = styled.div`
    margin-bottom: 18px;
`;

const CustomTextField = styled(TextField)`
    & .MuiInputLabel-root {
        color: #555;
        font-size: 14px;
    }

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

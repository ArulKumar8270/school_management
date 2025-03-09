import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField, Typography, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id;
    const address = "Sclass";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <StyledBox>
                <Stack sx={{ alignItems: 'center', mb: 3 }}>
                    <img
                        src={Classroom}
                        alt="classroom"
                        style={{ width: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                    />
                </Stack>
                <Typography variant="h4" align="center" gutterBottom>
                    Add New Class
                </Typography>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <TextField
                            label="Class Name"
                            variant="outlined"
                            value={sclassName}
                            onChange={(event) => setSclassName(event.target.value)}
                            required
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                        <BlueButton
                            fullWidth
                            size="large"
                            sx={{ mt: 3, borderRadius: '8px' }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Create"}
                        </BlueButton>
                        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ borderRadius: '8px' }}>
                            Go Back
                        </Button>
                    </Stack>
                </form>
            </StyledBox>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default AddClass;

const StyledBox = styled(Box)`
  max-width: 600px;
  padding: 50px 3rem;
  margin: auto;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 8px;
`;
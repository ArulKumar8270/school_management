import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography, Card, CardContent, Button } from '@mui/material';
import Popup from '../../components/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FeesCollection = () => {
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [remarks, setRemarks] = useState("");

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector(state => state.user);

    const navigate = useNavigate()

    const student = currentUser?._id;
    const school = currentUser?.school?._id;
    const classID = currentUser?.sclassName?._id;
    const address = "fees";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        student,
        school,
        amount,
        date,
        remarks,
        class : classID,
        paymentMethod : "Online"
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("✅ Fees submitted successfully");
            navigate("/Student/viewFeesDetails")
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("🚫 Network Error");
        }
    }, [status, error]);

    return (
        <FormContainer>
            <StyledCard elevation={3}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom className="gradient-text">
                        💵 Collect Fees
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 3, color: "#666" }}>
                        Enter student fee details below
                    </Typography>
                    <form onSubmit={submitHandler}>
                        <FieldContainer>
                            <CustomTextField
                                fullWidth
                                label="📅 Select Date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <CustomTextField
                                fullWidth
                                label="💰 Amount (in ₹)"
                                type="number"
                                variant="outlined"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                                required
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <CustomTextField
                                fullWidth
                                label="📝 Remarks (Optional)"
                                variant="outlined"
                                value={remarks}
                                onChange={(event) => setRemarks(event.target.value)}
                                multiline
                                rows={2}
                            />
                        </FieldContainer>

                        <SubmitButton type="submit" disabled={loader}>
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                        </SubmitButton>
                    </form>
                </CardContent>
            </StyledCard>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </FormContainer>
    );
};

export default FeesCollection;

// 🎨 Styled Components
const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
    padding: 30px;
`;

const StyledCard = styled(Card)`
    max-width: 500px;
    width: 100%;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    background: white;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 8px 22px rgba(0, 0, 0, 0.2);
    }
`;

const FieldContainer = styled.div`
    margin-bottom: 18px;
`;

const SubmitButton = styled(Button)`
    width: 100%;
    margin-top: 15px;
    background: linear-gradient(135deg, #1976d2, #43a047);
    color: white !important;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    padding: 12px;

    &:hover {
        background: linear-gradient(135deg, #1565c0, #388e3c);
        transform: translateY(-2px);
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

const CustomTextField = styled(TextField)`
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

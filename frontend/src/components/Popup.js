import * as React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import styled from 'styled-components';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const dispatch = useDispatch();

    const vertical = "top";
    const horizontal = "right";

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
        dispatch(underControl());
        dispatch(underStudentControl());
    };

    return (
        <StyledSnackbar
            open={showPopup}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
        >
            <StyledAlert
                onClose={handleClose}
                severity={message === "Done Successfully" ? "success" : "error"}
            >
                {message}
            </StyledAlert>
        </StyledSnackbar>
    );
};

export default Popup;

const StyledSnackbar = styled(Snackbar)`
  .MuiSnackbar-root {
    background-color: #333;
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StyledAlert = styled(MuiAlert)`
  width: 100%;
  font-family: "Josefin Sans", sans-serif;
  background-color: ${props => props.severity === "success" ? "#4caf50" : "#f44336"};
  color: white;
`;

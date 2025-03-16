import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, TextField, Button, Container, Typography, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Popup from '../../../components/Popup';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [noticeTo, setNoticeTo] = useState('all');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, noticeTo, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Notice
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Details"
            variant="outlined"
            margin="normal"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
          <FormControl fullWidth className='mt-3'>
            <InputLabel id="demo-simple-select-label">Notice To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={noticeTo}
              label="Notice to"
              onChange={(event) => setNoticeTo(event.target.value)}
              defaultValue='all'
              >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"teacher"}>Teacher</MenuItem>
              <MenuItem value={"student"}>student</MenuItem>
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loader}
            sx={{ mt: 2 }}
          >
            {loader ? <CircularProgress size={24} color="inherit" /> : 'Add'}
          </Button>
        </form>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default AddNotice;
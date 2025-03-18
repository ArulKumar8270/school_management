import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, TextField, Button, Container, Typography, Box } from '@mui/material';
import Popup from './Popup';
import { addStuff } from '../redux/userRelated/userHandle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

const UploadGallery = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const adminID = currentUser?._id || "";

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]); // Store images as an array
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [showTo, setShowTo] = useState('all');

    const navigate = useNavigate()

    const handleFileChange = (event) => {
        const fileArray = Array.from(event.target.files);
        setImages(fileArray);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoader(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("uploadedBy", adminID);
        formData.append("school", currentUser?.school?._id || adminID);
        formData.append("showTo", showTo);

        if (images.length > 0) {
            images.forEach((file, index) => {
                formData.append("images", file);
            });
        }
        try {
            const address = "gallery";
            await dispatch(addStuff(formData, address));
            setMessage("Upload successful!");
            navigate(-1)
            
        } catch (error) {
            setMessage("Upload failed!");
            console.error("Upload error:", error);
        } finally {
            setLoader(false);
            setShowPopup(true);
        }
    };


    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Upload Gallery
                </Typography>
                <form onSubmit={submitHandler} encType="multipart/form-data">
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
                        label="Description"
                        variant="outlined"
                        margin="normal"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    />
                    <div style={{
                        margin: "10px 0px"
                    }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Notice To</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={showTo}
                            label="Show to"
                            onChange={(event) => setShowTo(event.target.value)}
                            defaultValue='all'
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            <MenuItem value={"teacher"}>Teacher</MenuItem>
                            <MenuItem value={"student"}>student</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loader}
                        sx={{ mt: 2 }}
                    >
                        {loader ? <CircularProgress size={24} color="inherit" /> : 'Upload'}
                    </Button>
                </form>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default UploadGallery;

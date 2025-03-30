import { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCardIcon from "@mui/icons-material/AddCard";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import { styled } from "@mui/material/styles";

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sclassesList, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);
  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID) => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    borderRadius: '16px',
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
    boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 30px 0 rgba(0, 0, 0, 0.1)',
    },
    '& .class-title': {
      fontSize: '1.75rem',
      fontWeight: 700,
      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '16px'
    },
    '& .card-actions': {
      padding: '16px 24px',
      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px'
    }
  }));

  const Container = styled(Box)(({ theme }) => ({
    padding: '32px',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
    minHeight: '100vh',
    '& .header': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
    },
    '& .add-class-btn': {
      '& .MuiButton-root': {
        borderRadius: '12px',
        padding: '10px 24px',
        fontSize: '1rem',
        boxShadow: '0 4px 12px rgba(0, 150, 136, 0.2)',
      }
    }
  }));

  const GridContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '24px',
    animation: 'fadeIn 0.5s ease-out',
    '@keyframes fadeIn': {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    }
  }));

  const ActionButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: '12px',
    padding: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      transform: 'scale(1.05)'
    }
  }));

  console.log(sclassesList, "asdfas079")

  const SclassCard = ({ row }) => (
    <StyledCard>
      <CardContent sx={{ padding: '24px' }}>
        <Typography variant="h5" className="class-title">
          {row.sclassName}
        </Typography>
        {/* <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            fontSize: '0.95rem',
            letterSpacing: '0.5px'
          }}
        >
          Class ID: {row.id}
        </Typography> */}
      </CardContent>
      <CardActions className="card-actions">
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ActionButton color="error" onClick={() => deleteHandler(row._id)}>
            <DeleteIcon />
          </ActionButton>
          <ActionMenu row={row} />
        </Box>
        <BlueButton
          variant="contained"
          onClick={() => navigate(`/Admin/classes/class/${row._id}`)}
          sx={{
            borderRadius: '10px',
            textTransform: 'none',
            fontSize: '0.95rem',
            padding: '8px 20px'
          }}
        >
          View Details
        </BlueButton>
      </CardActions>
    </StyledCard>
  );

  const ActionMenu = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    return (
      <>
        <Tooltip title="More Actions">
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} size="small">
            <SpeedDialIcon />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => navigate(`/Admin/addsubject/${row._id}`)}>
            <ListItemIcon><PostAddIcon /></ListItemIcon>
            Add Subjects
          </MenuItem>
          <MenuItem onClick={() => navigate(`/Admin/class/addstudents/${row._id}`)}>
            <ListItemIcon><PersonAddAlt1Icon /></ListItemIcon>
            Add Students
          </MenuItem>
        </Menu>
      </>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: "Add New Class", action: () => navigate("/Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />, name: "Delete All Classes", action: () => deleteHandler(adminID),
    },
  ];

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <>
          {getresponse && (
            <Box className="add-class-btn">
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addclass")}>
                Add Class
              </GreenButton>
            </Box>
          )}

          <GridContainer>
            {Array.isArray(sclassesList) && sclassesList?.map((row) => <SclassCard key={row._id} row={row} />)}
          </GridContainer>

          <SpeedDialTemplate actions={actions} />
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default ShowClasses;
const LoadingContainer = styled(Box)({ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" });

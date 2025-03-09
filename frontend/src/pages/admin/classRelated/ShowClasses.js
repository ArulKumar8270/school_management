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
  Divider,
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
import styled from "styled-components";

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

  if (error) {
    console.error(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const sclassColumns = [{ id: "name", label: "Class Name", minWidth: 170 }];

  const sclassRows =
    sclassesList &&
    sclassesList.length > 0 &&
    sclassesList.map((sclass) => ({
      name: sclass.sclassName,
      id: sclass._id,
    }));

  const SclassCard = ({ row }) => {
    return (
      <StyledCard>
        <CardContent>
          <Typography variant="h6" className="class-title">
            {row.name}
          </Typography>
          <Divider sx={{ my: 1 }} />
        </CardContent>
        <CardActions className="card-actions">
          <Tooltip title="Delete Class">
            <IconButton onClick={() => deleteHandler(row.id, "Sclass")} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <BlueButton variant="contained" onClick={() => navigate(`/Admin/classes/class/${row.id}`)}>
            View
          </BlueButton>
          <ActionMenu row={row} />
        </CardActions>
      </StyledCard>
    );
  };

  const ActionMenu = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
      <>
        <Tooltip title="More Actions">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
            <SpeedDialIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 5,
            sx: styles.styledPaper,
          }}
        >
          <MenuItem onClick={() => navigate(`/Admin/addsubject/${row.id}`)}>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            Add Subjects
          </MenuItem>
          <MenuItem onClick={() => navigate(`/Admin/class/addstudents/${row.id}`)}>
            <ListItemIcon>
              <PersonAddAlt1Icon />
            </ListItemIcon>
            Add Students
          </MenuItem>
        </Menu>
      </>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: "Add New Class",
      action: () => navigate("/Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Classes",
      action: () => deleteHandler(adminID, "Sclasses"),
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
            {Array.isArray(sclassesList) &&
              sclassesList.length > 0 &&
              sclassRows.map((row) => <SclassCard key={row.id} row={row} />)}
          </GridContainer>

          <SpeedDialTemplate actions={actions} />
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: "visible",
    filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
    mt: 1.5,
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const Container = styled.div`
  padding: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  justify-content: center;
  margin-top: 20px;
`;

const StyledCard = styled(Card)`
  width: 300px;
  padding: 16px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  }

  .class-title {
    font-weight: bold;
    color: #1e88e5;
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }
`;

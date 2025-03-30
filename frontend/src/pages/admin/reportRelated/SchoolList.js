import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Box,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Stack,
} from "@mui/material";
import styled from "styled-components";
import TableTemplate from "../../../components/TableViewTemplate";
import { getAPI } from '../../../redux/getApiRelated/getApiHandle';

const SchoolList = () => {
  const dispatch = useDispatch();
  const { listData, loading } = useSelector((state) => state.getAPI);
  const [selectedSchool, setSelectedSchool] = useState("");

  useEffect(() => {
    dispatch(getAPI("?role=Admin", "Admin"));
  }, [dispatch]);

  // Extract unique school names
  const uniqueSchools = [...new Set(listData?.map((admin) => admin.schoolName))];

  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };

  const filteredSchools = listData?.filter(
    (admin) => !selectedSchool || admin.schoolName === selectedSchool
  );

  const schoolRows = filteredSchools?.map((admin) => ({
    name: admin.name,
    email: admin.email,
    school: admin.schoolName,
    actions: (
      <Stack direction="row" spacing={1}>
        <Button variant="contained" color="primary" size="small">
          Teacher
        </Button>
        <Button variant="contained" color="secondary" size="small">
          Student
        </Button>
        <Button variant="contained" color="success" size="small">
          Subject
        </Button>
      </Stack>
    ),
  }));

  return (
    <StyledContainer>
      {loading ? (
        <LoadingContainer>
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
            Loading Schools...
          </Typography>
        </LoadingContainer>
      ) : listData?.length === 0 ? (
        <NoDataContainer>
          <Typography variant="h5" color="error">
            🚫 No Schools Found
          </Typography>
        </NoDataContainer>
      ) : (
        <StyledPaper>
          <FormControl fullWidth>
            <Select value={selectedSchool} onChange={handleSchoolChange} displayEmpty>
              <MenuItem value="">All Schools</MenuItem>
              {uniqueSchools.map((school, index) => (
                <MenuItem key={index} value={school}>
                  {school}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              School List
            </Typography>
            <TableTemplate columns={schoolColumns} rows={schoolRows} />
          </Box>
        </StyledPaper>
      )}
    </StyledContainer>
  );
};

export default SchoolList;

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
`;

const StyledPaper = styled(Paper)`
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  box-shadow: none !important;
`;

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50vh;
`;

const NoDataContainer = styled(Box)`
  text-align: center;
  padding: 20px;
`;

const schoolColumns = [
  { id: "name", label: "👤 Name", minWidth: 200 },
  { id: "email", label: "📧 Email", minWidth: 250 },
  { id: "school", label: "🏫 School", minWidth: 200 },
  { id: "actions", label: "⚡ Actions", minWidth: 250 },
];

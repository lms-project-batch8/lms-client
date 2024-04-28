import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button as MuiButton,
  Typography,
  TextField,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CssBaseline,
  Container,
  CircularProgress, // Import CircularProgress
  Box, // Import Box to help with layout
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { backend } from "../url";

const columns = [
  { id: "user_id", label: "User ID", minWidth: 150 },
  { id: "user_name", label: "User Name", minWidth: 250 },
  { id: "user_email", label: "User Email", minWidth: 300 },
  { id: "user_role", label: "User Role", minWidth: 150 },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); // Set loading to true while fetching data
    try {
      const response = await axios.get(`${backend}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
    setLoading(false); // Set loading to false after fetching data
  };

  const handleDeleteUser = async () => {
    await axios.delete(`${backend}/users/${selectedUserId}`);
    fetchUsers();
    setDialogOpen(false);
  };

  const toggleActiveStatus = async (userId, isActive) => {
    await axios.put(`${backend}/users/${userId}`, { isActive });
    fetchUsers();
  };

  const filteredUsers = users.filter((user) =>
    user.user_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  const renderUsersTable = (usersToRender, roleTitle) => {
    const showActionColumn = roleTitle !== "Admin Users";
    return (
      <>
        <Typography variant='h6' sx={{ marginY: 2, color: "black" }}>
          {roleTitle}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ marginBottom: 4, bgcolor: "background.paper" }}
        >
          <Table stickyHeader aria-label={`${roleTitle} table`}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      fontSize: "15px",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {showActionColumn && (
                  <>
                    <TableCell
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        fontSize: "15px",
                      }}
                    >
                      Action
                    </TableCell>
                    <TableCell
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        fontSize: "15px",
                      }}
                    >
                      Status
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {usersToRender.map((user) => (
                <TableRow
                  hover
                  role='checkbox'
                  tabIndex={-1}
                  key={user.user_id}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{ fontSize: "15px" }}
                    >
                      {user[column.id]}
                    </TableCell>
                  ))}
                  {showActionColumn && (
                    <TableCell align='center'>
                      <div className='flex justify-center items-center gap-4'>
                        <Link to={`/users/edit/${user.user_id}`}>
                          <EditRoundedIcon
                            color='action'
                            sx={{ cursor: "pointer" }}
                          />
                        </Link>
                        <DeleteForeverRoundedIcon
                          color='warning'
                          onClick={() => {
                            setSelectedUserId(user.user_id);
                            setDialogOpen(true);
                          }}
                          sx={{ cursor: "pointer" }}
                        />
                      </div>
                    </TableCell>
                  )}
                  {showActionColumn && (
                    <TableCell>
                      <Switch
                        checked={user.isActive}
                        onChange={() =>
                          toggleActiveStatus(user.user_id, !user.isActive)
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  return (
    <Container
      component='main'
      maxWidth='lg'
      sx={{ bgcolor: "#f0f2f5", minHeight: "100vh", padding: 2 }}
    >
      <CssBaseline />
      <TextField
        label='Search Users'
        variant='filled'
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginTop: 2, bgcolor: "white", fontSize: "15px" }}
      />
      {renderUsersTable(
        filteredUsers.filter((user) => user.user_role === "admin"),
        "Admin Users",
      )}
      {renderUsersTable(
        filteredUsers.filter((user) => user.user_role === "trainer"),
        "Trainer Users",
      )}
      {renderUsersTable(
        filteredUsers.filter((user) => user.user_role === "trainee"),
        "Trainee Users",
      )}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{ "& .MuiDialog-paper": { bgcolor: "blanchedalmond" } }}
      >
        <DialogTitle id='alert-dialog-title'>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            sx={{ fontWeight: "bold", fontSize: "14px" }}
          >
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setDialogOpen(false)} color='primary'>
            Cancel
          </MuiButton>
          <MuiButton onClick={handleDeleteUser} color='secondary' autoFocus>
            Confirm
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

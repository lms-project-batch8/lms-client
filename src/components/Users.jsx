import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Modal,
  TextField,
  Button as MuiButton,
  Alert,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const columns = [
  { id: "user_id", label: "User Id", minWidth: 150 },
  { id: "user_name", label: "User Name", minWidth: 250 },
  { id: "user_email", label: "User Email", minWidth: 300 },
  { id: "user_role", label: "User Role", minWidth: 150 },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("https://lms-server-tktv.onrender.com/users");
      setUsers(res.data);
    };

    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://lms-server-tktv.onrender.com/users/${id}`);
      const res = await axios.get("https://lms-server-tktv.onrender.com/users");
      setUsers(res.data);
      setOpenAlert(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openFormOverlay = (userId) => {
    setCurrentUserId(userId);
    setIsFormOpen(true);
  };

  const closeFormOverlay = () => {
    setIsFormOpen(false);
  };

  const submitForm = () => {
    // Form submission logic goes here
    console.log("Form submitted for user ID:", currentUserId);
    closeFormOverlay();
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow
                  hover
                  role='checkbox'
                  tabIndex={-1}
                  key={user.user_id}
                >
                  {columns.map((column) => {
                    const value = user[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell align='center'>
                    {user.user_role !== "admin" && (
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
                            setOpenAlert(true);
                          }}
                          sx={{ cursor: "pointer" }}
                        />
                        {user.user_role === "trainee" && (
                          <span
                            variant='contained'
                            color='primary'
                            onClick={() => openFormOverlay(user.user_id)}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
                          >
                            Assign
                          </span>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {openAlert && (
        <Alert
          severity='warning'
          action={
            <MuiButton
              color='inherit'
              size='small'
              onClick={() => deleteUser(selectedUserId)}
            >
              Confirm
            </MuiButton>
          }
          onClose={() => setOpenAlert(false)}
        >
          Are you sure you want to delete this user?
        </Alert>
      )}
      <Modal
        open={isFormOpen}
        onClose={closeFormOverlay}
        className='flex items-center justify-center p-4'
      >
        <div
          className='bg-white p-8 rounded-lg space-y-4'
          style={{ width: 400 }}
        >
          <TextField label='Some Field' variant='outlined' fullWidth />   
          <TextField label='Another Field' variant='outlined' fullWidth />
          <div className='flex justify-end gap-2'>    
            <MuiButton variant='contained' color='primary' onClick={submitForm}>
              Submit
            </MuiButton>
            <MuiButton variant='outlined' onClick={closeFormOverlay}>
              Cancel
            </MuiButton>
          </div>
        </div>
      </Modal>
    </Paper>
  );
}

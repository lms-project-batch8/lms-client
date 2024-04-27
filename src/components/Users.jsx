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
  Button as MuiButton,
  Alert,
  Typography,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { backend } from "../url";

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

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`${backend}/users`);
      setUsers(res.data);
    };

    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${backend}/users/${id}`);
      const res = await axios.get(`${backend}/users`);
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

  const adminUsers = users.filter((user) => user.user_role === "admin");
  const traineeUsers = users.filter((user) => user.user_role === "trainee");
  const trainerUsers = users.filter((user) => user.user_role === "trainer");

  const renderUsersTable = (usersToRender, roleTitle) => {
    // Determine if we should show the "Action" column based on the role
    const showActionColumn = roleTitle !== "Admin Users";

    return (
      <>
        <Typography variant='h6' sx={{ marginY: 2 }}>
          {roleTitle}
        </Typography>
        <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
          <Table stickyHeader aria-label={`${roleTitle} table`}>
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
                {showActionColumn && <TableCell>Action</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {usersToRender
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
                              setOpenAlert(true);
                            }}
                            sx={{ cursor: "pointer" }}
                          />
                        </div>
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
    <div>
      {renderUsersTable(adminUsers, "Admin Users")}
      {renderUsersTable(trainerUsers, "Trainer Users")}
      {renderUsersTable(traineeUsers, "Trainee Users")}
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
    </div>
  );
}

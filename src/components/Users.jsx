import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";

const columns = [
  { id: "user_id", label: "User Id", minWidth: 130 },
  { id: "user_name", label: "User Name", minWidth: 200 },
  { id: "user_email", label: "User Email", minWidth: 250 },
  { id: "user_password", label: "User Password", minWidth: 200 },
  { id: "user_role", label: "User Role", minWidth: 180 },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const deleteUser = async (id, setUsers) => {
    try {
      await axios.delete(`https://lms-server-tktv.onrender.com/users/${id}`);
      // Update the users state after successful deletion
      const res = await axios.get("https://lms-server-tktv.onrender.com/users");
      setUsers(res.data);
      setOpenAlert(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("https://lms-server-tktv.onrender.com/users");
      setUsers(res.data);
    };

    getUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100vh", // Ensure Paper takes full viewport height
        display: "flex",
        flexDirection: "column", // Stack children vertically
        justifyContent: "space-between", // Spread out the content
        overflow: "hidden",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <TableContainer sx={{ flexGrow: 1, overflow: "auto" }}>
        {/* Make TableContainer flexible and scrollable */}
        <Table stickyHeader aria-label='sticky table'>
          <TableHead sx={{ background: "blueviolet" }}>
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
              <TableCell>Action</TableCell> {/* Add this cell for actions */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = user[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
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
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <Alert
            severity='warning'
            onClose={() => {
              setOpenAlert(false);
            }}
          >
            Confirm Delete User
          </Alert>
          <Alert
            severity='success'
            action={
              <Button
                color='inherit'
                size='small'
                onClick={() => deleteUser(selectedUserId, setUsers)}
              >
                Delete
              </Button>
            }
          >
            Confirm Delete User
          </Alert>
        </div>
      )}
    </Paper>
  );
}

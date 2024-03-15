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
import EditUser from "./Forms/EditUser";
import { Link } from "react-router-dom";

const columns = [
  { id: "user_id", label: "user_id", minWidth: 130 },
  { id: "user_name", label: "user_name", minWidth: 200 },
  { id: "user_email", label: "user_email", minWidth: 250 },
  { id: "user_password", label: "user_password", minWidth: 200 },
  { id: "user_role", label: "user_role", minWidth: 180 },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editUser, setEditUser] = useState(null);


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
  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleCloseEditUser = () => {
    setEditUser(null); // Clear the user to be edited
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
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ background: "blueviolet" }}>
            <TableRow>
              {columns.map((column) => (
                <>
                
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = user[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">                  
                    <div className="flex justify-center items-center gap-4">               
                        <EditRoundedIcon
                          color="action"
                          sx={{ cursor: "pointer" }}
                          onClick={()=>handleEditUser(user)}
                        />
                      <DeleteForeverRoundedIcon
                        color="warning"
                        onClick={() => {}}
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
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
            {editUser && <EditUser user={editUser} onClose={handleCloseEditUser} />}

    </Paper>
  );
}

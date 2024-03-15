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

const columns = [
  { id: "user_id", label: "User ID", minWidth: 130, width: "10%" },
  { id: "user_name", label: "Name", minWidth: 200, width: "20%" },
  { id: "user_email", label: "Email", minWidth: 250, width: "25%" },
  { id: "user_password", label: "Password", minWidth: 200, width: "20%" },
  { id: "user_role", label: "Role", minWidth: 180, width: "15%" },
  { id: "actions", label: "", minWidth: 100, width: "10%" },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
        width: `calc(100% - 0px)`,
        height: `calc(100vh - 60px)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <TableContainer sx={{ flexGrow: 1, overflow: "auto" }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead sx={{ background: "violet" }}>
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
                <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = user[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ minWidth: column.minWidth, width: column.width }}
                      >
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
        component='div'
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

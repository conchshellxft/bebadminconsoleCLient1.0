import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";
import { Button,Link } from "@mui/material";
import router from "next/router";

const headCells = [
  {
    label: "Log Id",
    id: "_id",
  },
  {
    label: "Timestamp",
    id: "timestamp",
  },
  {
    label: "Type",
    id: "type",
  },
  {
    label: "Title",
    id: "title",
  },
  {
    label: "Message",
    id: "message",
  },
  {
    label: "Version",
    id: "version",
  },
  {
    label: "Build",
    id: "build",
  },
  {
    label: "Location",
    id: "location.char",
  },
  {
    label: "Request Object",
    id: "description.request",
  },
  {
    label: "Response Object",
    id: "description.response",
  }
];



function EnhancedTableHead(props: any) {
  const { order, setOrder, orderBy, setOrderBy } = props;
  return (
    <TableHead>
      <TableRow
        style={{height:30}}>
        {headCells.map((headCell) => (
          <TableCell style={{ backgroundColor: "#EFF5FB", whiteSpace:"nowrap"}} key={headCell.id}>
            <TableSortLabel
              disabled={["receipt"].includes(headCell.id)}
              active={orderBy ? orderBy === headCell.id : false}
              direction={order === "ASC" ? "asc" : "desc"}
              onClick={() => {
                setOrder(order === "ASC" ? "DESC" : "ASC");
                setOrderBy(headCell.id);
              }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export default function AllReasonTransactionsTable({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  rows,
  countRecords,
  order,
  setOrder,
  orderBy,
  setOrderBy,
}: any) {
  var data = rows;
  var temp_rows = [];

  for (let i = 1; i <= rowsPerPage - data?.length; i++) {
    temp_rows.push({});
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - temp_rows?.length) : 0;

  return (
    <Box sx={{ width: "100%" }} style={{overflow: "scroll"}} >
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer sx={{ maxHeight: 1100 }}>
          <Table aria-labelledby="tableTitle" size={"medium"} stickyHeader>
            <EnhancedTableHead
              {...{ order, setOrder, orderBy, setOrderBy }}
              rowCount={temp_rows?.length}
            />
            <TableBody sx={{ width: "100%" }}>
              {data?.map((row: any, index: number) => {
                return ( row != "undefined" && (
                  <TableRow
                    style={{
                      backgroundColor: index % 2 === 0 ? "white" : "#F8F8F8",
                      height: 30,
                    }}
                  >
                  <TableCell style={{whiteSpace:"nowrap"}}>
                      {row._id}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                      {row.timestamp &&
                        format(new Date(row.timestamp), "dd-MM-yyyy | HH:mm:ss")}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                      {row.type}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                        {row.title}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                        {row.message}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                        {row.version}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.build}</TableCell>  
                    <TableCell style={{whiteSpace:"nowrap"}}>{row?.location?.char}:{row?.location?.line}:{row?.location?.file}</TableCell>  
                    <TableCell>{JSON.stringify(row?.description?.request)}</TableCell>  
                    <TableCell>{JSON.stringify(row?.description?.response)}</TableCell>
                  </TableRow>
                ));
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={countRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

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
import { Button, Link } from "@mui/material";
import router from "next/router";

const headCells = [
  {
    label: "Date & Time",
    id: "joining_timestamp",
  },
  {
    label: "User Id",
    id: "user_id"
  },
  {
    label: "Name",
    id: "name",
  },
  {
    label: "Referral Code",
    id: "referral_code",
  },
  {
    label: "Email",
    id: "email",
  },
  {
    label: "Phone",
    id: "phone_number",
  },
  {
    label: "Phone Verified",
    id: "phone_verified",
  },
  {
    label: "Account Status",
    id: "account_status",
  },
  // {
  //   label: "Main Wallet Balance (RM)",
  //   id: "main_wallet_amount",
  // },
  // {
  //   label: "Cashback & Referral Earning Wallet Balance (RM)",
  //   id: "cashback_wallet_amount",
  // },
  // {
  //   label: "Receive Money Wallet Balance (RM)",
  //   id: "receive_money_wallet_amount",
  // },
  {
    label: "View Logs",
    id: "view_logs",
  }
];

const headCellsCompany = [
  {
    label: "Date & Time",
    id: "joining_timestamp",
  },
  {
    label: "Company Id",
    id: "user_id"
  },
  {
    label: "Name",
    id: "name",
  },
  {
    label: "Email",
    id: "email",
  },
  {
    label: "Phone",
    id: "phone_number",
  },
  {
    label: "Phone Verified",
    id: "phone_verified",
  },
  {
    label: "Account Status",
    id: "account_status",
  },
  // {
  //   label: "Main Wallet Balance (RM)",
  //   id: "main_wallet_amount",
  // },
  // {
  //   label: "Cashback & Referral Earning Wallet Balance (RM)",
  //   id: "cashback_wallet_amount",
  // },
  // {
  //   label: "Receive Money Wallet Balance (RM)",
  //   id: "receive_money_wallet_amount",
  // },
  {
    label: "View Logs",
    id: "view_logs",
  }
];


function EnhancedTableHead(props: any) {
  const { order, setOrder, orderBy, setOrderBy,type } = props;
  return (
    <TableHead>
      <TableRow
        style={{height:30}}>
        {[... type==="Company"?headCellsCompany:headCells].map((headCell) => (
          <TableCell style={{ backgroundColor: "#EFF5FB", whiteSpace:"nowrap"}} key={headCell.id}>
            <TableSortLabel
              disabled={["image", "action"].includes(headCell.id)}
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

export default function UserListTable({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  data,
  total,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  type
}: any) {
  const rows: any[] = data;

  for (let i = 1; i <= rowsPerPage - data?.length; i++) {
    rows.push({});
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


  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer sx={{ maxHeight: 1100 }}>
          <Table aria-labelledby="tableTitle" size={"medium"} stickyHeader>
            <EnhancedTableHead
              {...{ order, setOrder, orderBy, setOrderBy,type }}
              rowCount={rows?.length}
            />
            <TableBody sx={{ width: "100%" }}>
              {data?.map((row: any, index: number) => {
                return (
                  <TableRow
                    onClick={(event) => console.log(event, row.user_id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.user_id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "white" : "#F8F8F8",
                      height: 30,
                    }}
                  >
                    <TableCell style={{whiteSpace:"nowrap"}}>
                      {row.joining_timestamp &&
                        format(
                          new Date(row.joining_timestamp),
                          "dd-MM-yyyy | HH:mm:ss"
                        )}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.user_id}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                      <a
                        style={{ cursor: "pointer", textDecoration:"underline" }}
                        target="_blank"
                        rel="noreferrer"
                        href={`/user-management/user-list/user-profile?userId=${row.user_id}`}
                      >
                        {row.name}
                      </a>
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.referral_code}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.email}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.phone_number}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                      { typeof(row.phone_verified) != "undefined" && (
                        <Button
                          size="small"
                          style={{
                            fontSize: 11,
                            width: "100%",
                            backgroundColor:
                              row.phone_verified === true
                                ? "#59A630"
                                : 
                                row.phone_verified === false
                                ? "#F14E4E"
                                : "orange"
                              
                          }}
                        >
                          {
                            row.phone_verified == true
                            ? "Verified"
                            :  row.phone_verified == false
                              ? "Not Verified"
                              : ""
                          }
                        </Button>
                      )}
                    </TableCell>

                    <TableCell style={{whiteSpace:"nowrap"}}>
                      {row.account_status && (
                        <Button
                          size="small"
                          style={{
                            fontSize: 11,
                            width: "100%",
                            backgroundColor:
                              row.account_status === "APPROVED"
                                ? "#59A630"
                                : row.account_status === "NOT_APPROVED"
                                ? "#F14E4E"
                                : row.account_status === "PENDING"
                                ? "#EDAF3A"
                                : "orange",
                          }}
                        >
                          {row.account_status}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.main_wallet_amount}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.cashback_wallet_amount}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.receive_money_wallet_amount}</TableCell>
                    <TableCell>
                      <Button size="small"
                        onClick={() => router.push(`/user-management/user-logs?user_id=${row.user_id}`)}
                        style={{
                          fontSize: 11,
                          width: "100%",
                          backgroundColor:"orange"
                        }} > 
                        View Logs
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

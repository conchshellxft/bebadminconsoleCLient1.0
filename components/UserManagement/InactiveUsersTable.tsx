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

/*
user_id: data2[index].user_id,
last_active: data2[index].metrics.last_active,
name: data2[index].name,
email: data2[index].email,
phone_number: data2[index].phone_number,
country_code: data2[index].country_code,
referral_code: data2[index].referral_code,
main_wallet_amount: data3.main_wallet_amount,
cashback_wallet_amount: data3.cashback_wallet_amount,
todays_referral_earning_wallet_amount: data3.todays_referral_earning_wallet_amount,
receive_money_wallet_amount: data3.receive_money_wallet_amount
*/

const headCells = [
  {
    label: "Last Log In",
    id: "last_active",
  },
  {
    label: "User Id",
    id:"user_id"
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
    label: "Phone Num.",
    id: "phone_number",
  },
  {
    label: "Main Wallet Bal. (RM)",
    id: "main_wallet_amount",
  },
  {
    label: "Cashback & Referral Earning Wallet Bal. (RM)",
    id: "cashback_wallet_amount",
  },
  {
    label: "Receive Bal. (RM)",
    id: "receive_money_wallet_amount"
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

export default function InactiveUsersTable({
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
  setRefresh
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
              {...{ order, setOrder, orderBy, setOrderBy }}
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
                      {row.last_active &&
                        format(new Date(row.last_active), "dd-MM-yyyy | HH:mm:ss")}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                      {row.user_id}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                    <Link   
                        style={{ cursor: "pointer", textDecoration:"underline" }}
                        onClick={() =>
                          router.push(
                            `/user-management/user-list/user-profile?userId=${row.email}`
                          )
                        }>
                          {row.name}
                      </Link>
                      </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.referral_code}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.email}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                      {row.phone_number && row.country_code + row.phone_number}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.main_wallet_amount}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.cashback_wallet_amount}</TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.receive_money_wallet_amount}</TableCell>
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

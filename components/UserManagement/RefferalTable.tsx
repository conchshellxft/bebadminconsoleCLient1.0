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


const headCells = [
  {
    label: "Joining Date & Time",
    id: "joining_timestamp",
  },
  {
    label: "Last Active",
    id: "last_active",
  },
  {
    label: "Name",
    id: "name",
  },
  {
    label: "Total Earning",
    id: "total_earning",
  }
];

const trans_type_mapping:any = {
  "TOPUP_CASHBACK":"Cashback",
  "BILL_PAYMENT_CASHBACK":"Cashback",
  "REFERRAL_EARNING":"Referral Earnings",
  "RELOAD_WALLET_FEES":"Transaction Fees",
  "RELOAD_WALLET_SERVICE_PROVIDER_TRANSACTION_FEES":"Reload Wallet Service Provider Transaction Fees",
  "BILL_PAYMENT":"Bill Payment",
  "TOPUP":"Topup",
  "RELOAD_WALLET":"Reload Wallet",
  "BILL_PAYMENT_SERVICE_PROVIDER":"Bill Payment Service Provider",
  "TOPUP_SERVICE_PROVIDER":"Topup Service Provider",
  "TOPUP_REFERRAL":"Topup Referral",
  "BILL_PAYMENT_REFERRAL":"Bill Payment Referral",
  "TOPUP_PROFIT":"Topup Profit",
  "BILL_PAYMENT_PROFIT":"Bill Payment Profit",
  "EARNING_TO_MAIN_TRANSFER":"Earning to Main Wallet Transfer",
  "USER_LOAN_REPAY":"Loan Repay",
  "BILL_PAYMENT_DONATE":"Bill Payment Donate",
  "TOPUP_DONATE":"Topup Donate"
}


function EnhancedTableHead(props: any) {
  const { order, setOrder, orderBy, setOrderBy } = props;
  return (
    <TableHead>
      <TableRow
        style={{height:30}}>
        {headCells.map((headCell) => (
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

export default function ReferralTable({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  data,
  total,
  order,
  setOrder,
  orderBy,
  setOrderBy
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
            <EnhancedTableHead {...{order, setOrder, orderBy, setOrderBy}} rowCount={rows?.length} />
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
                        format(new Date(row.joining_timestamp), "dd-MM-yyyy | HH:mm:ss")}
                    </TableCell>
                    <TableCell style={{whiteSpace:"nowrap"}}>
                      {row.last_active &&
                        format(new Date(row.last_active), "dd-MM-yyyy | HH:mm:ss")}
                    </TableCell>
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
                    <TableCell style={{whiteSpace:"nowrap"}}>{row.total_earning}</TableCell>  
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

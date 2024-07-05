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
import { Button, Divider, Modal, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
// import { ADMIN_REPORT_API, API, BASE_URL } from "../../constants/Api";
import CloseIcon from "@mui/icons-material/Close";
// import { truncate_str, truncate_str_view } from "../../constants/Api";

const headCells: any = {
  ALL_TRANSACTIONS: [
    {
      label: "Date & Time",
      id: "timestamp",
    },
    {
      label: "Transaction Id",
      id: "transaction_id"
    },
    {
      label: "Transaction Id (Service Provider)",
      id: "others.service_provider_transaction_id"
    },
    {
      label: "Trans. Type",
      id: "trans_type",
    },
    {
      label: "Product",
      id: "others.product_name",
    },
    {
      label: "Acc. Number",
      id: "others.account_number",
    },
    {
      label: "Amount (RM)",
      id: "amount",
    },
    {
      label:"Main Wallet Balance (RM)",
      id:"main_wallet_amount"
    },
    {
      label:"Cashback & Referral Earning Wallet Balance (RM)",
      id:"cashback_wallet_amount"
    },
    {
      label: "Receive Money Wallet Balance (RM)",
      id:"receive_money_wallet_amount"
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Remarks",
      id: "remarks",
    }
  ],
  TRANSACTION_HISTORY: [
    {
      label: "Date & Time",
      id: "timestamp",
    },
    {
      label: "Transaction Id",
      id: "transaction_id"
    },
    {
      label: "Transaction Id (Service Provider)",
      id: "others.service_provider_transaction_id"
    },
    {
      label: "Trans. Type",
      id: "trans_type",
    },
    {
      label: "Product",
      id: "others.product_name",
    },
    {
      label: "Acc. Number",
      id: "others.account_number",
    },
    {
      label: "Amount (RM)",
      id: "amount",
    },
    {
      label:"Main Wallet Balance (RM)",
      id:"main_wallet_amount"
    },
    {
      label:"Cashback & Referral Earning Wallet Balance (RM)",
      id:"cashback_wallet_amount"
    },
    {
      label:"Receive Money Wallet Balance (RM)",
      id:"receive_money_wallet_amount"
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Remarks",
      id: "remarks",
    }
  ],
  EARNING_HISTORY: [
    {
      label: "Date & Time",
      id: "timestamp",
    },
    {
      label: "Transaction Id",
      id: "transaction_id"
    },
    {
      label: "Trans. Type",
      id: "trans_type",
    },
    {
      label: "Product",
      id: "others.product_name",
    },
    {
      label: "Acc. Number",
      id: "others.account_number",
    },
    {
      label: "Amount (RM)",
      id: "amount",
    },
    {
      label:"Main Wallet Balance (RM)",
      id:"main_wallet_amount"
    },
    {
      label:"Cashback & Referral Earning Wallet Balance (RM)",
      id:"cashback_wallet_amount"
    },
    {
      label:"Receive Money Wallet Balance (RM)",
      id:"receive_money_wallet_amount"
    },
    {
      label:"Status",
      id:"status"
    },
    {
      label: "Remarks",
      id: "remarks",
    }
  ],
  CASHBACK_AND_REFERRALS_EARNING: [
    {
      label: "Date & Time",
      id: "timestamp",
    },
    {
      label: "Transaction Id",
      id: "transaction_id"
    },
    {
      label: "Transaction Id (Service Provider)",
      id: "others.service_provider_transaction_id"
    },
    {
      label: "Trans. Type",
      id: "trans_type",
    },
    {
      label: "Product",
      id: "others.product_name",
    },
    {
      label: "Acc. Number",
      id: "others.account_number",
    },
    {
      label: "Amount (RM)",
      id: "amount",
    },
    {
      label:"Main Wallet Balance (RM)",
      id:"main_wallet_amount"
    },
    {
      label:"Cashback & Referral Earning Wallet Balance (RM)",
      id:"cashback_wallet_amount"
    },
    {
      label:"Receive Money Wallet Balance (RM)",
      id:"receive_money_wallet_amount"
    },
    {
      label: "Status",
      id: "status"
    },
    {
      label: "Remarks",
      id: "remarks"
    },
    {
      label: "Total Profit",
      id: "others.total_profit"
    },
    {
      label: "Parrotpos Profit",
      id: "others.parrotpos_profit"
    },
    {
      label: "CB (RM)",
      id: "others.cashback_amount",
    },
    {
      label: "Ref 1",
      id: "others.actual_level_1_referral_amount",
    },
    {
      label: "Ref 2",
      id: "others.actual_level_2_referral_amount",
    },
    {
      label: "Ref 3",
      id: "others.actual_level_3_referral_amount",
    },
    {
      label: "Ref 4",
      id: "others.actual_level_4_referral_amount",
    },
    {
      label: "Ref 5",
      id: "others.actual_level_5_referral_amount",
    },
    {
      label: "Donation",
      id: "others.donation_amount",
    }
  
  ],
};

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
  "TOPUP_DONATE":"Topup Donate",
  "EARNING_TO_MAIN_TRANSACTION_FEES":"Earning to Main Wallet Transfer Fees",
  "SEND_MONEY":"Send Money",
  "RECEIVED_MONEY":"Received Money"
}


function EnhancedTableHead(props: any) {
  const tableDataType: string = props.tableDataType;

  const [tooltipData, setTooltipData] = React.useState<any>(null);

  const onInfoHover = (level: number) => {
    // ADMIN_REPORT_API.post("admin/user-management/level-referrals", {
    //   user_id: props.userId,
    //   level: level,
    // }).then((res) => setTooltipData(res.data.data));
  };

  const { order, orderBy, setOrder, setOrderBy } = props;
  return (
    <TableHead>
      {tableDataType !== "CASHBACK_AND_REFERRALS_EARNING" ? (
        <TableRow
        style={{height:30}}>
          {headCells[tableDataType].map((headCell: any) => (
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
      ) : (
        <TableRow
        style={{height:30}}>
          {headCells[tableDataType].map((headCell: any) => (
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
                {headCell.label.includes("Ref ") ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {headCell.label} &nbsp;{" "}
                    <Tooltip
                      onMouseOver={() =>
                        onInfoHover(headCell.label.split(" ")[1])
                      }
                      title={
                        <div>
                          {tooltipData?.length > 0 ? (
                            tooltipData?.map((user: any) => (
                              <div
                                key={user.email}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                              <a
                                style={{ cursor: "pointer", textDecoration:"underline" }}
                                target="_blank"
                                rel="noreferrer"
                                href={`/user-management/user-list/user-profile?userId=${user?.email}`}
                              >
                                <p>{user.name}</p>
                                &nbsp;&nbsp;
                                <p>{user.email}</p>
                              </a>
                              </div>
                            ))
                          ) : (
                            <p>No Data</p>
                          )}
                        </div>
                      }
                      placement="top"
                    >
                      <InfoIcon />
                    </Tooltip>
                  </div>
                ) : (
                  headCell.label
                )}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      )}
    </TableHead>
  );
}

export default function UserTransactionTable({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  data,
  total,
  tableDataType,
  userId,
  order,
  orderBy,
  setOrder,
  setOrderBy,
}: any) {
  const rows: any[] = data;
  const [open, setOpen] = React.useState(false);

  console.log(data);

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
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    bgcolor: "white",
    outline: 0,
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer sx={{ maxHeight: 1100 }}>
          <Table aria-labelledby="tableTitle" size={"medium"} stickyHeader>
            <EnhancedTableHead
              tableDataType={tableDataType}
              rowCount={rows?.length}
              userId={userId}
              order={order}
              orderBy={orderBy}
              setOrder={setOrder}
              setOrderBy={setOrderBy}
            />
            <TableBody sx={{ width: "100%" }}>
              {data?.map((row: any, index: number) => {
                return (
                  <TableRow
                    onClick={(event) => console.log(event, row.transaction_id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.transaction_id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "white" : "#F8F8F8",
                      height: 30,
                    }}
                  >
                    <TableCell style={{whiteSpace:"nowrap"}}>
                      {row?.timestamp &&
                        format(new Date(row.timestamp), "dd-MM-yyyy | HH:mm:ss")}
                    </TableCell>
                      
                    {(row.trans_type == "REFERRAL_EARNING") && (
                         <TableCell style={{whiteSpace:"nowrap"}}>
                        <a
                          style={{ cursor: "pointer", textDecoration: "underline" }}
                          target="_blank"
                          rel="noreferrer"
                          href={`/reports/day-referrals?user_id=${row.others?.email}&day=${row.timestamp}&name=${row.others.name}`}
                        >
                          {row.transaction_id}
                        </a>
                        </TableCell>
                      )}
                      {(row.trans_type == "TOPUP" || row.trans_type == 'BILL_PAYMENT' || row.trans_type == 'RELOAD_WALLET') && (
                         <TableCell style={{whiteSpace:"nowrap"}}>
                        <a
                          style={{ cursor: "pointer", textDecoration: "underline" }}
                          target="_blank"
                          rel="noreferrer"
                          href={`/reports/all-reason-transactions?transaction_reason=${row?.transaction_id}`}
                        >
                        {row.transaction_id}
                        </a>
                        </TableCell>
                      )} 
                     {(row.trans_type != "TOPUP" && row.trans_type != 'BILL_PAYMENT' && row.trans_type != "REFERRAL_EARNING" 
                      && row.trans_type != 'RELOAD_WALLET') && (
                        <TableCell style={{whiteSpace:"nowrap"}}>
                         <a
                          style={{ cursor: "pointer", textDecoration: "underline" }}
                          target="_blank"
                          rel="noreferrer"
                          href={`/reports/all-reason-transactions?transaction_reason=${row?.others?.reason}`}
                        >
                        {row.transaction_id}
                        </a>
                        </TableCell>
                      )}

                    {tableDataType != "EARNING_HISTORY" && (row.trans_type == 'TOPUP' ||
                      row.trans_type == 'BILL_PAYMENT') && (
                      <TableCell style={{ whiteSpace: 'nowrap' }}>
                        {row?.others?.service_provider_transaction_id} (IIMMPACT)
                      </TableCell>
                    )}

                    {tableDataType != "EARNING_HISTORY" && (row.trans_type == "RELOAD_WALLET") && (
                      <TableCell style={{ whiteSpace: 'nowrap' }}>
                        {row?.others?.service_provider_transaction_id} (BILLPLZ)
                      </TableCell>
                    )}
                    
                     {tableDataType != "EARNING_HISTORY" && (row.trans_type != "RELOAD_WALLET" && row.trans_type != "BILL_PAYMENT" &&
                      row.trans_type != "TOPUP") && (
                      <TableCell style={{whiteSpace:"nowrap"}}></TableCell>
                    )}

                    <TableCell style={{whiteSpace:"nowrap"}}>{trans_type_mapping[row.trans_type]}</TableCell>

                    {(row.trans_type != "RELOAD_WALLET"  && row.trans_type != "RELOAD_WALLET_FEES" ) && (
                      <TableCell style={{whiteSpace:"nowrap"}}>{row.others?.product_name}</TableCell>
                    )}
                    {(row.trans_type == "RELOAD_WALLET"  || row.trans_type == "RELOAD_WALLET_FEES" ) && (
                      <TableCell style={{whiteSpace:"nowrap"}}>{row.others?.fpx_bank_name}</TableCell>
                    )}
                       
                    {(row.trans_type != "RELOAD_WALLET"  && row.trans_type != "RELOAD_WALLET_FEES" && row.trans_type != "RECEIVED_MONEY"
                      && row.trans_type != "SEND_MONEY") && (
                     <TableCell style={{whiteSpace:"nowrap"}}>{row.others?.account_number}</TableCell>
                    )}
                    {(row.trans_type == "SEND_MONEY") && (
                      <TableCell>{row?.others?.receiver_phone_number}</TableCell>
                    )}
                      {(row.trans_type == "RECEIVED_MONEY") && (
                      <TableCell>{row?.others?.sender_phone_number}</TableCell>
                    )}
                    {(row.trans_type == "RELOAD_WALLET"  || row.trans_type == "RELOAD_WALLET_FEES") && (
                      <TableCell style={{whiteSpace:"nowrap"}}>{row.others?.country_code}-{row.others?.phone_number}</TableCell>
                    )}

                    <TableCell style={{whiteSpace:"nowrap"}}>{0}</TableCell>

                    {(row.trans_type == "RELOAD_WALLET"  || row.trans_type == "RELOAD_WALLET_FEES" ) && (
                      <TableCell style={{whiteSpace:"nowrap"}}>{0}</TableCell>
                    )}
                    {(row.trans_type != "RELOAD_WALLET"  && row.trans_type != "RELOAD_WALLET_FEES" ) && (
                      <TableCell style={{whiteSpace:"nowrap"}}>{0}</TableCell>
                    )}
          
                    {(row.trans_type == "RELOAD_WALLET"  || row.trans_type == "RELOAD_WALLET_FEES" ) && (
                      <TableCell style={{whiteSpace:"nowrap"}}>{0}</TableCell>
                    )}
                    {(row.trans_type != "RELOAD_WALLET"  && row.trans_type != "RELOAD_WALLET_FEES" ) && (
                      <TableCell style={{whiteSpace:"nowrap"}}>{0}</TableCell>
                    )}
      
                    {(row.trans_type == "RELOAD_WALLET"  || row.trans_type == "RELOAD_WALLET_FEES" ) && (
                      <TableCell style={{whiteSpace:"nowrap"}}>{0}</TableCell>
                    )}
                    {(row.trans_type != "RELOAD_WALLET"  && row.trans_type != "RELOAD_WALLET_FEES" ) && (
                      <TableCell style={{whiteSpace:"nowrap"}}>{0}</TableCell>
                    )}

                    {(
                      <TableCell style={{whiteSpace:"nowrap"}}>
                        {row.status && (
                          <Button
                            size="small"
                            style={{
                              fontSize: 11,
                              width: "100%",
                              backgroundColor:
                                row.status === "SUCCESS"
                                  ? "#59A630"
                                  : row.status === "FAILED"
                                  ? "#F14E4E"
                                  : row.status === "PENDING"
                                  ? "#EDAF3A"
                                  : "orange",
                            }}
                          >
                            {row.status}
                          </Button>
                        )}
                      </TableCell>
                    )}
                    {(
                      <TableCell style={{whiteSpace:"nowrap"}}>{row?.remarks}</TableCell>
                    )}
                    {tableDataType === "CASHBACK_AND_REFERRALS_EARNING" && (
                      <>
                        <TableCell style={{whiteSpace:"nowrap"}}>
                          {/* {row.others?.total_profit && truncate_str(row.others?.total_profit)}
                           */}
                        </TableCell>
                        <TableCell style={{whiteSpace:"nowrap"}}>
                          {/* {row.others?.parrotpos_profit && truncate_str(row.others?.parrotpos_profit)} */}
                        </TableCell>
                        <TableCell style={{whiteSpace:"nowrap"}}>
                          {/* {row.others?.cashback_amount && truncate_str_view(row.others?.cashback_amount)} */}
                        </TableCell>
                        <TableCell style={{whiteSpace:"nowrap"}}>
                          {/* {row.others?.actual_level_1_referral_amount && truncate_str_view(row.others?.actual_level_1_referral_amount)} */}
                        </TableCell>
                        <TableCell style={{whiteSpace:"nowrap"}}>
                          {/* {row.others?.actual_level_2_referral_amount && truncate_str_view(row.others?.actual_level_2_referral_amount)} */}
                        </TableCell>
                        <TableCell style={{whiteSpace:"nowrap"}}>
                          {/* {row.others?.actual_level_3_referral_amount && truncate_str_view(row.others?.actual_level_3_referral_amount)} */}
                        </TableCell>
                        <TableCell style={{whiteSpace:"nowrap"}}>
                          {/* {row.others?.actual_level_4_referral_amount && truncate_str_view(row.others?.actual_level_4_referral_amount)} */}
                        </TableCell>
                        <TableCell style={{whiteSpace:"nowrap"}}>
                          {/* {row.others?.actual_level_5_referral_amount && truncate_str_view(row.others?.actual_level_5_referral_amount)} */}
                        </TableCell>
                        <TableCell style={{whiteSpace:"nowrap"}}>
                          {/* {row.others?.donation_amount && truncate_str_view(row.others?.donation_amount)} */}
                          </TableCell>
                      </>
                    )}

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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="add impacct"
        aria-describedby="adding iimmpact to the wallet"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CloseIcon
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div style={{ padding: "0px 0px" }}>
            <Typography variant="h5">Receipt</Typography>
          </div>
          <iframe
            src="demo_iframe.htm"
            name="iframe_a"
            height="85%"
            width="100%"
            title="Iframe Example"
          ></iframe>
          <Divider />
        </Box>
      </Modal>
    </Box>
  );
}

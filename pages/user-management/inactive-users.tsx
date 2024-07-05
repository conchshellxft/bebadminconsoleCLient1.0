import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import LeftNav from "../../components/LeftNav";
import TopNav from "../../components/TopNav";
import { DIMENSIONS } from "../../constants/Dimensions";
import { AppContext } from "../_app";
// import { ADMIN_REPORT_API } from "../../constants/Api";
// import { Total } from "../dashboard/overview";
import Image from "next/image";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import InactiveUsersTable from "../../components/UserManagement/InactiveUsersTable";
import { useSnackAlert } from "../../hooks/useSnackAlert";
import { useRouter } from "next/router";

const InactiveUsers = () => {
  const { navOpen, setLoading } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [inactiveUsersData, setInactiveUsersData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const showSnackAlert = useSnackAlert();  
  const router = useRouter();
  const [order, setOrder] = React.useState<any>("DESC");
  const [orderBy, setOrderBy] = React.useState<any>("last_active");
  const [refresh, setRefresh] = React.useState(false);

  const totalData = [
    {
      src: "/Svg/XMLID_1441_.svg",
      alt: "profit icon",
      text: "Total Balance In Main Wallet (RM)",
      value: inactiveUsersData?.total_main_wallet_amount,
    },
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank icon",
      text: "Total Balance In Cashback & Referral Earning Wallet (RM)",
      value: inactiveUsersData?.total_cashback_wallet_amount,
    },
    {
      src: "/Svg/XMLID_1441_.svg",
      alt: "profit icon",
      text: "Total Balance In Receive Money Wallet (RM)",
      value: inactiveUsersData?.total_receive_money_wallet_amount,
    },
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank icon",
      text: "Total Balance In Today's Referral Wallet (RM)",
      value: inactiveUsersData?.total_todays_referral_earning_wallet_amount,
    },
  ];

  useEffect(() => {
    setLoading(true);
    console.log("apis triggered");

    // ADMIN_REPORT_API.post("admin/user-management/inactive-users", {
    //   no_of_records: rowsPerPage,
    //   page_no: page,
    //   ...(searchQuery !== "" && { search_query: searchQuery }),
    //   sort: { field: orderBy, type: order },
    // }).then((res) => {
    //   setLoading(false);
    //   setInactiveUsersData(res.data?.data)
    // });
  }, [page, rowsPerPage, searchQuery, order, orderBy]);

  console.log(inactiveUsersData);

  const handleTransferOut = () => {
    setLoading(true);
    // ADMIN_REPORT_API.post("admin/user-management/transfer-out-inactive")
    //   .then((res) => {
    //     setLoading(false);
    //     showSnackAlert("success", "Transferred Out Successfully!");
    //     setRefresh((prevState: any) => !prevState)
    //   })
    //   .catch((err) => showSnackAlert("error", "Transfer Out Failed!"));
  };

  const sendReminderNotification = () => {
    setLoading(true);
    // ADMIN_REPORT_API.post(
    //   "admin/user-management/set-reminder-notification-inactive"
    // )
    //   .then((res) => {
    //     setLoading(false);
    //     showSnackAlert("success", "Reminder Sent Successfully!");
    //   })
    //   .catch((err) => showSnackAlert("error", "Failed Sending Reminder!"));
  };

  return (
    <div style={{ height: "100vh" }}>
      <TopNav />
      <div
        style={{
          display: "flex",
          height: `calc(100vh - ${DIMENSIONS.TOPNAV_HIEGHT})`,
        }}
      >
        <div>{navOpen && <LeftNav />}</div>

        <div style={{ width: "100%", overflowY: "scroll" }}>
          {/* filter */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              columnGap: 20,
              // backgroundColor: "white",
              padding: 20,
            }}
          >
            <div style={{ display: "flex" }}>
              <KeyboardArrowLeftIcon style={{ marginRight: 10 }} />
              <Typography variant="body1"> Inactive Users </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                style={{ fontSize: 18 }}
                color="primary.100"
                variant="subtitle2"
              >
                Total Inactive Users :
              </Typography>
              &nbsp;&nbsp;
              <Typography style={{ fontSize: 20 }}>
                {inactiveUsersData?.total_count}
              </Typography>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#F3F4F8",
              // padding: "3vw"
            }}
          >
            {/* summary */}
            <div style={{ padding: "20px 3vw" }}>
              <div style={{ display: "flex", columnGap: 20 }}>
                <div style={{ width: "60%" }}>
                  {/* {totalData.map((item, index) => {
                    return (
                      <div
                        key={item.text}
                        style={{
                          marginBottom: index !== 3 ? 20: 0,
                        }}
                      >
                        <Total
                          src={item.src}
                          alt={item.alt}
                          text={item.text}
                          value={item.value}
                        />
                      </div>
                    );
                  })} */}
                </div>
                <div style={{ display: 'flex', alignContent: 'stretch', flexDirection: 'column'}}>
                <Paper
                  sx={{
                    // width: "40%",
                    textAlign: "center",
                    padding: 4,
                    lineHeight: 1.5,
                    marginBottom: 2,
                  }}
                >
                  <Image src={"/Svg/Group 9806.svg"} height={50} width={50} />
                  <Typography lineHeight={2} color="primary.100">
                    Total Transfers Outs from Inactive Accounts
                  </Typography>
                  <Typography variant="h6">
                    {inactiveUsersData?.total_receive_money_wallet_amount}
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    // width: "40%",
                    textAlign: "center",
                    padding: 4,
                    lineHeight: 2,
                  }}
                >
                  <Image src={"/Svg/Group 9806.svg"} height={50} width={50} />
                  <Typography lineHeight={2} color="primary.100">
                    Total Inactive Accounts
                  </Typography>
                  <Typography variant="h6">
                    {inactiveUsersData?.total_matched}
                  </Typography>
                </Paper>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "59%",
                  columnGap: 20,
                  marginBottom: 20,
                  marginTop: 20,
                  height: 50,
                }}
              >
                {/* <div
                  style={{
                    backgroundColor: "#EBEBEB",
                    textAlign: "center",
                    flexGrow: 1,
                    width: "40%",
                    paddingTop: 12,
                  }}
                >
                  <Typography onClick={() => sendReminderNotification()} style={{ cursor: "pointer" }} color="primary.100">
                    Set Reminder Notification
                  </Typography>
                </div> */}
                <Button
                  onClick={() => sendReminderNotification()}
                  sx={{ width: "60%" }}
                >
                  Set Reminder Notification
                </Button>
                <Button
                  onClick={() => handleTransferOut()}
                  sx={{ flexGrow: 1, flexBasis: 1 }}
                  startIcon={<CallMissedOutgoingIcon />}
                >
                  Transfer Out
                </Button>
              </div>

              <div style={{ textAlign: "center", width: "40%" }}>
                <Typography
                  fontFamily="Italic"
                  fontSize={13}
                  variant="subtitle2"
                  color="primary.100"
                >
                  For users with 6 months last log in
                </Typography>
              </div>
            </div>

            <Divider sx={{ mb: 5 }} />

            <div style={{ padding: "20px 3vw" }}>
              {/* table filters */}
              <div
                style={{
                  display: "flex",
                  columnGap: 10,
                  justifyContent: "flex-end",
                  marginBottom: 20,
                  flex: 1,
                  // width: "50%",
                  // float: "right",
                }}
              >
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  style={{
                    backgroundColor: "white",
                    flexGrow: 1,
                    maxWidth: "39%",
                  }}
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                />
                <Button
                  size="small"
                  variant="contained"
                  style={{ backgroundColor: "#59A62F" }}
                >
                  Search
                </Button>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setPage(0);
                  }}
                  size="small"
                  variant="contained"
                  style={{ backgroundColor: "#EFEFEF", color: "black" }}
                >
                  Reset
                </Button>
              </div>

              {/* table */}
              <div>
                <InactiveUsersTable
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  data={inactiveUsersData?.users}
                  total={inactiveUsersData?.total_matched}
                  order={order}
                  setOrder={setOrder}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InactiveUsers;

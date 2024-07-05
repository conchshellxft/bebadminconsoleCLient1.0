import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LeftNav from "../../components/LeftNav";
import TopNav from "../../components/TopNav";
import { DIMENSIONS } from "../../constants/Dimensions";
import { AppContext } from "../_app";
// import { ADMIN_REPORT_API, API } from "../../constants/Api";
// import { Total } from "../dashboard/overview";
import Image from "next/image";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import InactiveUsersTable from "../../components/UserManagement/InactiveUsersTable";
import { useSnackAlert } from "../../hooks/useSnackAlert";
import { useRouter } from "next/router";


const BlockedUsers = () => {
  const { navOpen, setLoading } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [blockedUsersData, setBlockedUsersData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [order, setOrder] = React.useState<any>("DESC");
  const [orderBy, setOrderBy] = React.useState<any>("last_active");
  const showSnackAlert = useSnackAlert();
  const router = useRouter();
  const [refresh, setRefresh] = React.useState(false);

  const totalData = [
    {
      src: "/Svg/XMLID_1441_.svg",
      alt: "profit icon",
      text: "Total Balance In Main Wallet (RM)",
      value: blockedUsersData?.total_main_wallet_amount,
    },
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank icon",
      text: "Total Balance In Earning Wallet (RM)",
      value: blockedUsersData?.total_cashback_wallet_amount,
    },
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank icon",
      text: "Total Receive Money In Wallet (RM)",
      value: blockedUsersData?.total_receive_money_wallet_amount,
    },
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank icon",
      text: "Total Todays Referral In Wallet (RM)",
      value: blockedUsersData?.total_todays_referral_earning_wallet_amount,
    },
  ];

  useEffect(() => {
    setLoading(true);
    console.log("apis triggered");

    // ADMIN_REPORT_API.post("admin/user-management/blocked-users", {
    //   no_of_records: rowsPerPage,
    //   page_no: page,
    //   ...(searchQuery !== "" && { search_query: searchQuery }),
    //   sort: {
    //     type: order,
    //     field: orderBy,
    //   },
    // }).then((res) => {
    //   setLoading(false);
    //   setBlockedUsersData(res.data?.data)
    // });
  }, [page, rowsPerPage, searchQuery, order, orderBy, refresh]);

  // console.log(blockedUsersData);

  const handleTransferOut = () => {
    // ADMIN_REPORT_API.post("admin/user-management/transfer-out-blocked")
    //   .then((res) => {
    //     setLoading(false);
    //     showSnackAlert("success", "Transferred Out Successfully!");
    //     setRefresh((prevState: any) => !prevState)
    //   })
    //   .catch((err) => showSnackAlert("error", "Transfer Out Failed!"));
  };

  const sendReminderNotification = () => {
    // ADMIN_REPORT_API.post(
    //   "admin/user-management/set-reminder-notification-blocked"
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
              <Typography variant="body1"> Blocked Users </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                style={{ fontSize: 18 }}
                color="primary.100"
                variant="subtitle2"
              >
                Total Blocked Users :
              </Typography>
              &nbsp;&nbsp;
              <Typography style={{ fontSize: 20 }}>
                {blockedUsersData?.total_matched}
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
              <div style={{ display: "flex", columnGap: 20, marginBottom: 20 }}>
                <div style={{ width: "60%" }}>
                  {/* {totalData.map((item, index) => {
                    return (
                      <div
                        key={item.text}
                        style={{
                          marginBottom: index !== 3 ? 20 : 0,
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
                <div>
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
                      Total Transfers Outs from Blocked Accounts
                    </Typography>
                    <Typography variant="h6">
                      {blockedUsersData?.total_count}
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
                      Total Blocked Accounts
                    </Typography>
                    <Typography variant="h6">
                      {blockedUsersData?.total_matched}
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
                  <Button
                    onClick={() => sendReminderNotification()}
                    // style={{ cursor: "pointer" }}
                    // color="primary.100"
                  >
                    Set Reminder Notification
                  </Button>
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
                  Blocked by Super Admin
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
                  data={blockedUsersData?.users}
                  total={blockedUsersData?.total_matched}
                  order={order}
                  setOrder={setOrder}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  setRefresh={setRefresh}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedUsers;

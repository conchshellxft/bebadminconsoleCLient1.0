import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LeftNav from "../../../../components/LeftNav";
import TopNav from "../../../../components/TopNav";
import { DIMENSIONS } from "../../../../constants/Dimensions";
import { AppContext } from "../../../_app";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { add, sub } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";
// import { API, ADMIN_REPORT_API } from "../../../../constants/Api";
import UserTransactionTable from "../../../../components/UserManagement/UserTransactionTable";
import UserProfileCard from "../../../../components/UserManagement/UserProfileCard";
import AccountStatusCard from "../../../../components/UserManagement/AccountStatusCard";

const Filter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchQuery,
  setSearchQuery,
  setTransactionStatus,
  setTableDataType,
  setPage,
}: any) => {
  const filterStyle = {
    backgroundColor: "white",
    flexBasis: 1,
    flexGrow: 1,
    // maxWidth: "20%",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        columnGap: 20,
        flexWrap: "wrap",
        rowGap: 10,
        // backgroundColor: "white",
        //   padding: 10,
      }}
    >
      <div style={{ display: "flex", columnGap: 20 }}>
        <DatePicker
          label="StartDate"
          inputFormat={"dd/MM/yyyy"}
          value={startDate}
          maxDate={endDate ? sub(endDate, { days: 0 }) : new Date()}
          onChange={(newValue: any) => {
            setStartDate(new Date(newValue.setHours(0,0,0,0)));
          }}
          renderInput={(params:any) => (
            <TextField size="small" style={filterStyle} {...params} />
          )}
        />
        <DatePicker
          label="EndDate"
          inputFormat={"dd/MM/yyyy"}
          value={endDate}
          minDate={startDate && add(startDate, { days: 0 })}
          maxDate={new Date()}
          onChange={(newValue: any) => {
            setEndDate(new Date(newValue.setHours(23,59,59,999)));
          }}
          renderInput={(params:any) => (
            <TextField size="small" style={filterStyle} {...params} />
          )}
        />
      </div>
      <div style={{ display: "flex", columnGap: 10, justifyContent: "center" }}>
        <TextField
          size="small"
          id="outlined-basic"
          label="Search"
          variant="outlined"
          style={{ backgroundColor: "white" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
            setStartDate(null);
            setEndDate(null);
            setSearchQuery("");
            setTransactionStatus("ALL");
            setTableDataType("ALL_TRANSACTIONS");
            setPage(0);
          }}
          size="small"
          variant="contained"
          style={{ backgroundColor: "#EFEFEF", color: "black" }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default function UserProfile() {
  const { navOpen, breadCrumbs, setLoading } = useContext(AppContext);
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tableDataType, setTableDataType] = useState("ALL_TRANSACTIONS");
  const [transactionStatus, setTransactionStatus] = useState("ALL");
  const [transactionData, setTransactionData] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAccountStatusCard, setShowAccountStatusCard] = useState(false);
  const [userId, setUserId] = useState(router.query.userId);
  const [order, setOrder] = useState<any>(null);
  const [orderBy, setOrderBy] = useState<any>(null);
  const [userProfile, setUserProfile] = useState({
    joining_time: "2021-06-14T18:25:27.463Z",
    name: "",
    profile_image: "",
    country_code: "",
    phone_number: "",
    email: "",
    referral_code: "",
    account_verif: "Not Approved",
    amount_main_wallet: 0,
    amount_earning_wallet: 0,
    last_active: "Yesterday",
    referral_count: 0,
    earning_to_main: 0,
    send_money: 0,
    receive_money: 0,
    fpx_count: 0,
    total_bill_reload: 0,
    total_sales: 0,
    total_donation: 0,
    total_net_profit: 0,
    referrer_name: "NA",
    referrer_referral_code: "",
    referrer_email: "",
    referrer_user_id: "",
  });

  useEffect(() => {
    setLoading(true);
    // ADMIN_REPORT_API.post("admin/user-management/fetch-user-details", {
    //   user_id: userId,
    // }).then((res) => {
    //   setLoading(false);
    //   setUserProfile(res?.data?.data);
    // });
  }, [userId]);

  useEffect(() => {
    setLoading(true);
    // ADMIN_REPORT_API.post("admin/user-management/user-transactions", {
    //   user_id: userId,
    //   type: tableDataType,
    //   page_no: page,
    //   no_of_records: rowsPerPage,
    //   ...(transactionStatus !== "ALL" && { trans_status: transactionStatus }),
    //   ...(startDate && { start_date: startDate }),
    //   ...(endDate && { end_date: endDate }),
    //   sort: { field: orderBy, type: order },
    //   search_query: searchQuery,
    // }).then((res) => {
    //   setLoading(false);
    //   setTransactionData(res?.data);
    // });
  }, [
    userId,
    page,
    rowsPerPage,
    tableDataType,
    transactionStatus,
    startDate,
    endDate,
    order,
    orderBy,
    searchQuery,
    userId,
  ]);

  useEffect(() => {
    setUserId(router.query.userId);
  }, [router.query.userId]);

  // console.log(transactionData);

  const tableDataTypes = [
    {
      text: "All Transactions",
      value: "ALL_TRANSACTIONS",
    },
    {
      text: "Transaction History",
      value: "TRANSACTION_HISTORY",
    },
    {
      text: "Earning History",
      value: "EARNING_HISTORY",
    },
    {
      text: "Cashback & Referrals",
      value: "CASHBACK_AND_REFERRALS_EARNING",
    },
  ];

  const transactionStatusData = [
    {
      text: "All",
      value: "ALL",
    },
    {
      text: "Successful Only",
      value: "SUCCESS",
    },
    {
      text: "Failed Only",
      value: "FAILED",
    },
    {
      text: "Pending Only",
      value: "PENDING",
    },
  ];

  return (
    //container div
    <div style={{ height: "100vh" }}>
      <TopNav />
      {/* div after removing top nav its a flex containing the left nav and and content to the right */}
      <div
        style={{
          display: "flex",
          height: `calc(100vh - ${DIMENSIONS.TOPNAV_HIEGHT})`,
        }}
      >
        <div>{navOpen && <LeftNav />}</div>

        {/* main div with ALL the content */}
        <div
          style={{
            width: "100%",
            height: `calc(100vh - ${DIMENSIONS.TOPNAV_HIEGHT})`,
            overflowY: "scroll",
          }}
        >
          <div style={{ display: "flex", padding: 30 }}>
            <KeyboardArrowLeftIcon
              onClick={() => router.back()}
              style={{ marginRight: 10, cursor: "pointer" }}
            />
            <Typography variant="body1"> User Profile </Typography>
          </div>

          {/* main div excluding back nav */}
          <div
            style={{
              padding: "3vw",
              backgroundColor: "#F3F4F8",
              minHeight: "calc(100vh - 170px)",
              // boxShadow: "0px 3px 15px #0000004D"
            }}
          >
            {showAccountStatusCard ? (
              <AccountStatusCard {...{ setShowAccountStatusCard }} />
            ) : (
              <UserProfileCard
                {...{
                  userProfile,
                  setShowAccountStatusCard,
                  setUserId,
                }}
              />
            )}
            {/* filter */}
            <div>
              <div style={{ marginTop: 30, marginBottom: 10 }}>
                <Filter
                  {...{
                    startDate,
                    setStartDate,
                    endDate,
                    setEndDate,
                    searchQuery,
                    setSearchQuery,
                    setTransactionStatus,
                    setTableDataType,
                    setPage,
                  }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <FormControl component="fieldset">
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <RadioGroup
                    row
                    aria-label="transaction_type"
                    name="row-radio-buttons-group"
                    value={transactionStatus}
                    onChange={(e: any) => setTransactionStatus(e.target.value)}
                  >
                    {transactionStatusData.map((data) => {
                      return (
                        <FormControlLabel
                          key={data.text}
                          value={data.value}
                          defaultChecked
                          disabled={tableDataType != "ALL_TRANSACTIONS"}
                          control={
                            <Radio
                              disabled={tableDataType != "ALL_TRANSACTIONS"}
                              style={{
                                color:
                                  tableDataType === "ALL_TRANSACTIONS" &&
                                  transactionStatus === data.value
                                    ? "green"
                                    : "rgb(0, 0, 0, 0.30)",
                              }}
                            />
                          }
                          label={data.text}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </div>
              <div style={{ display: "flex", columnGap: 5 }}>
                {tableDataTypes.map((item) => {
                  return (
                    <Button
                      value={item.value}
                      key={item.value}
                      onClick={(e: any) => {
                        setStartDate(null);
                        setEndDate(null);
                        setSearchQuery("");
                        setTransactionStatus("ALL");
                        setPage(0);
                        setTableDataType(e.target.value);
                        setOrder(null);
                        setOrderBy(null);
                      }}
                      style={{
                        flexGrow: 1,
                        backgroundColor:
                          tableDataType !== item.value ? "#EFEFEF" : "#86B92B",
                        color: tableDataType !== item.value ? "black" : "white",
                      }}
                    >
                      {item.text}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* table */}
            <div style={{ marginTop: 30 }}>
              <UserTransactionTable
                {...{
                  page,
                  setPage,
                  rowsPerPage,
                  setRowsPerPage,
                  data: transactionData?.data,
                  total: transactionData?.total_matched,
                  tableDataType,
                  userId,
                  order,
                  orderBy,
                  setOrder,
                  setOrderBy,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

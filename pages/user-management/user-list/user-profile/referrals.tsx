import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LeftNav from "../../../../components/LeftNav";
import TopNav from "../../../../components/TopNav";
import { DIMENSIONS } from "../../../../constants/Dimensions";
import { AppContext } from "../../../_app";
import { DatePicker } from "@mui/x-date-pickers";
import { add, sub } from "date-fns";
// import { API, ADMIN_REPORT_API } from "../../../../constants/Api";
// import { Total, TotalSummary } from "../../../dashboard/overview";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter } from "next/router";
import ReferralTable from "../../../../components/UserManagement/RefferalTable";

const Filter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchQuery,
  setSearchQuery,
  setEarningSort,
  setPage,
  setSelectedLevel,
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
            setEarningSort("HIGH_TO_LOW");
            setSearchQuery(null);
            setPage(0);
            setSelectedLevel(1);
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

const MainWallet = () => {
  const RadioFilterData = [
    {
      text: "Highest to Lowest Earning",
      value: "HIGH_TO_LOW",
    },
    {
      text: "Lowest to Highest Earning",
      value: "LOW_TO_HIGH",
    },
  ];

  const { navOpen, setLoading } = useContext(AppContext);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [earningSort, setEarningSort] = useState("HIGH_TO_LOW");
  const [referralData, setReferralData] = useState<any>(null);
  const [order, setOrder] = React.useState<any>(null);
  const [orderBy, setOrderBy] = React.useState<any>(null);
  console.log(router.query.user_id);
  const [userId, setUserId] = useState(router.query.user_id);

  const totalData = [
    {
      src: "/Svg/001-user.svg",
      alt: "profit icon",
      text: "Total Referrals",
      value: referralData?.count_referral,
    },
    {
      src: "/Svg/002-share.svg",
      alt: "bank icon",
      text: "Total Referral Earnings (RM)",
      value: referralData?.total_referral,
    },
  ];

  const levelsData = [
    {
      value: 1,
      text: "Level 1",
    },
    {
      value: 2,
      text: "Level 2",
    },
    {
      value: 3,
      text: "Level 3",
    },
    {
      value: 4,
      text: "Level 4",
    },
    {
      value: 5,
      text: "Level 5",
    },
  ];

  const usersTotalData = [
    {
      users: referralData?.level_1?.referral_count,
      total: referralData?.level_1?.referral_earning,
    },
    {
      users: referralData?.level_2?.referral_count,
      total: referralData?.level_2?.referral_earning,
    },
    {
      users: referralData?.level_3?.referral_count,
      total: referralData?.level_3?.referral_earning,
    },
    {
      users: referralData?.level_4?.referral_count,
      total: referralData?.level_4?.referral_earning,
    },
    {
      users: referralData?.level_5?.referral_count,
      total: referralData?.level_5?.referral_earning,
    },
  ];

  useEffect(() => {
  

    setLoading(true);
    console.log("apis triggered");

      // ADMIN_REPORT_API.post("admin/user-management/user-referrals", {
      //   start_date: startDate,
      //   end_date: endDate,
      //   level: selectedLevel,
      //   type: earningSort,
      //   user_id: router.query.user_id,
      //   sort: { field: orderBy, type: order },
      //   page_no: page,
      //   no_of_records: rowsPerPage,
      //   search_query: searchQuery,
      // }).then((res) => {
      //   setLoading(false);
      //   console.log(res.data?.data);
      //   setReferralData(res.data?.data);
      // })
      // .catch((error) => console.log("error", error));  
  }, [
    startDate,
    endDate,
    selectedLevel,
    earningSort,
    order,
    orderBy,
    searchQuery,
    page,
    rowsPerPage,
    router.query.user_id,
  ]);

  // console.log(referralData);

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
          <div style={{ display: "flex", padding: 20 }}>
            <KeyboardArrowLeftIcon
              onClick={() => router.back()}
              style={{ marginRight: 10, cursor: "pointer" }}
            />
            <Typography variant="body1">
              {" "}
              {`${router.query.name}'s Referrals`}{" "}
            </Typography>
          </div>

          <div style={{ backgroundColor: "#F3F4F8" }}>
            {/* total   */}
            <div
              style={{
                display: "flex",
                columnGap: 20,
                marginBottom: 20,
                padding: 20,
              }}
            >
              {/* {totalData.map((item) => {
                return (
                  <div key={item.text} style={{ width: "50%" }}>
                    <Total
                      src={item.src}
                      alt={"profit icon"}
                      text={item.text}
                      value={item.value}
                    />
                  </div>
                );
              })} */}
            </div>

            <Divider style={{ width: "100%" }} />

            {/* filter */}
            <div style={{ padding: 20 }}>
              <Filter
                {...{
                  startDate,
                  setStartDate,
                  endDate,
                  setEndDate,
                  searchQuery,
                  setSearchQuery,
                  setEarningSort,
                  setPage,
                  setSelectedLevel,
                }}
              />

              <FormControl component="fieldset" style={{ margin: "10px 0px" }}>
                {/* <FormLabel component="legend">Gender</FormLabel> */}
                <RadioGroup
                  value={earningSort}
                  row
                  aria-label="transaction_type"
                  name="row-radio-buttons-group"
                >
                  {RadioFilterData.map((data) => {
                    return (
                      <FormControlLabel
                        key={data.text}
                        value={data.value}
                        onChange={(e: any) => setEarningSort(e.target.value)}
                        // sx={{
                        //   "& .MuiFormControlLabel-label": {
                        //     fontSize: 20,
                        //   },
                        // }}
                        control={
                          <Radio
                            style={{
                              color:
                                data.value === earningSort
                                  ? "green"
                                  : "rgb(0, 0, 0, 0.50)",
                            }}
                          />
                        }
                        // style={{ color: "blue" }}
                        label={data.text}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </div>

            {/* level filter */}
            <div
              style={{ display: "flex", columnGap: 20, padding: "8px 15px" }}
            >
              {levelsData.map((item) => {
                return (
                  <div
                    key={item.value}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      backgroundColor:
                        selectedLevel === item.value ? "#449E34" : "white",
                      boxShadow: "0px 0px 6px #0000001A",
                      padding: 10,
                      flex: 1,
                    }}
                    onClick={() => setSelectedLevel(item.value)}
                  >
                    <Typography
                      style={{
                        color:
                          selectedLevel === item.value ? "white" : "inherit",
                      }}
                    >
                      {item.text}
                    </Typography>
                  </div>
                );
              })}
            </div>

            <div
              style={{ display: "flex", columnGap: 20, padding: "0px 15px" }}
            >
              {usersTotalData.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      backgroundColor: "white",
                      boxShadow: "0px 0px 6px #0000001A",
                      padding: 10,
                      flex: 1,
                    }}
                    // onClick={() => setSelectedLevel(item.value)}
                  >
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {`${item.users} users -`}
                      <img
                        src="/Svg/Group 9898.svg"
                        alt="total"
                        style={{ margin: "0px 8px" }}
                      />
                      {`${item.total}`}
                    </Typography>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: 40 }}>
              <ReferralTable
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                data={referralData?.users}
                total={referralData?.total_matched ?? 0}
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
  );
};

export default MainWallet;

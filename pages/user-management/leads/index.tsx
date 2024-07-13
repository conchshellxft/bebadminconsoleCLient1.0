import { DatePicker } from "@mui/x-date-pickers";
import {
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { add, sub } from "date-fns";
import { useContext, useEffect, useState } from "react";
import LeftNav from "../../../components/LeftNav";
import TopNav from "../../../components/TopNav";
import UserListTable from "../../../components/UserManagement/UserListTable";
// import { ADMIN_REPORT_API } from "../../../constants/Api";
import { DIMENSIONS } from "../../../constants/Dimensions";
import { AppContext } from "../../_app";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const StatsItem = ({
  text,
  total,
  value,
  usersFilter,
  setUsersFilter,
  setStartDate,
  setEndDate,
  setSearchQuery,
  setPage,
}: {
  text: string;
  total: number;
  value: string;
  usersFilter: string;
  setUsersFilter: any;
  setStartDate: any;
  setEndDate: any;
  setSearchQuery: any;
  setPage: any;
}) => {
  return (
    <div style={{ flexBasis: 1, flexGrow: 1, textAlign: "center" }}>
      <Paper
        onClick={() => {
          setStartDate(null);
          setEndDate(null);
          setSearchQuery(null);
          setUsersFilter(value);
          setPage(0);
        }}
        style={{
          padding: "5px 20px",
          textAlign: "center",
          border: usersFilter === value ? "1.5px solid #6CAE2D" : "none",
          cursor: "pointer",
        }}
      >
        <Typography variant="h6" color="primary">
          {total}
        </Typography>
        <Typography color="primary.100">{text}</Typography>
      </Paper>
      {usersFilter === value && (
        <ArrowDropDownIcon style={{ fontSize: "5vh", color: "#6CAE2D" }} />
      )}
    </div>
  );
};

const Filter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchQuery,
  setSearchQuery,
  setPage,
  setUsersFilter,
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
          value={endDate}
          inputFormat={"dd/MM/yyyy"}
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
      <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      marginBottom: 20,
                      marginTop: 30,
                    }}
                  >
                    <Typography>Status: </Typography>
                    &nbsp;&nbsp;&nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={}
                      label="Age"
                      style={{ width: 280 }}
                      onChange={(e) => {
                        // let service_providers = data.service_providers;
                        // item.status = e.target.value === "True" ? true : false;
                        // setData({ ...data, service_providers });
                      }}
                    >
                      <MenuItem value={"Freelancer"}>Freelancer</MenuItem>
                      <MenuItem value={"In-House"}>In-House</MenuItem>
                      <MenuItem value={"Individual"}>Individual</MenuItem>

                    </Select>
                  </div>
      <div style={{ display: "flex", columnGap: 10, justifyContent: "center" }}>
        <TextField
          size="small"
          id="outlined-basic"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          label="Search"
          variant="outlined"
          style={{ backgroundColor: "white" }}
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
            setSearchQuery(null);
            setUsersFilter("TOTAL_USERS");
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

const CompanyList = () => {
  const { navOpen, setLoading } = useContext(AppContext);
  const [usersData, setUsersData] = useState<any>(null);
  const [usersFilter, setUsersFilter] = useState("TOTAL_USERS");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [order, setOrder] = useState<any>("joining_timestamp");
  const [orderBy, setOrderBy] = useState<any>("DESC");
  const type = "users"

  useEffect(() => {
    setLoading(true);
    console.log("apis triggered");
    // ADMIN_REPORT_API.post("admin/user-management/user-list", {
    //   type: usersFilter,
    //   page_no: page,
    //   no_of_records: rowsPerPage,
    //   ...(startDate && { start_date: startDate }),
    //   ...(endDate && { end_date: endDate }),
    //   sort: { field: orderBy, type: order },
    //   search_query: searchQuery,
    // })
    //   .then((res) => {
    //     setLoading(false);
    //     setUsersData(res.data.data)
    //   })
    //   .catch((err) => console.log(err));
  }, [
    startDate,
    endDate,
    page,
    rowsPerPage,
    usersFilter,
    order,
    orderBy,
    searchQuery,
  ]);

  const statsData = [
    {
      value: "NEW_USERS_THIS_MONTH",
      text: "This Month",
      total: usersData?.info?.joined_this_month,
    },
    // {
    //   value: "VERIFIED_USERS",
    //   text: "Verified Companies",
    //   total: usersData?.info?.verified_users,
    // },
    {
      value: "ACTIVE_USERS",
      text: "Active Leads",
      total: usersData?.info?.active_users,
    },
    {
      value: "INACTIVE_USERS",
      text: "Inactive Leads",
      total: usersData?.info?.inactive_users,
    },
    {
      value: "TOTAL_USERS",
      text: "Total Leads",
      total: usersData?.info?.total_users,
    },
  ];

  // console.log(usersData);
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

        {/* main div with all the content */}
        <div
          style={{
            width: "100%",
            height: `calc(100vh - ${DIMENSIONS.TOPNAV_HIEGHT})`,
            overflowY: "scroll",
          }}
        >
          {/* statsContainer */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 20,
              rowGap: 20,
              padding: "20px 20px 0px 20px",
            }}
          >
            {statsData.map((data) => {
              return (
                <StatsItem
                  key={data.value}
                  {...{
                    text: data.text,
                    value: data.value,
                    total: data.total,
                    usersFilter,
                    setUsersFilter,
                    setStartDate,
                    setEndDate,
                    setSearchQuery,
                    setPage,
                  }}
                />
              );
            })}
          </div>

          {/* main div including filter */}
          <div
            style={{
              padding: 20,
              backgroundColor: "#F3F4F8",
              minHeight: "calc(100vh - 170px)",
              // boxShadow: "0px 3px 15px #0000004D"
            }}
          >
            {/* filter */}
            <Filter
              {...{
                usersData,
                setUsersData,
                usersFilter,
                setUsersFilter,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                searchQuery,
                setSearchQuery,
                setPage,
              }}
            />

            {/* table */}
            <div style={{ marginTop: 30 }}>
              <UserListTable
                {...{
                  page,
                  setPage,
                  rowsPerPage,
                  setRowsPerPage,
                  data: usersData?.data,
                  total: usersData?.total_matched,
                  order,
                  setOrder,
                  orderBy,
                  setOrderBy,
                  type
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;

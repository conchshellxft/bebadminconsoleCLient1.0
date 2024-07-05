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
import UserLogsTable from "../../components/UserManagement/UserLogsTable";
import { useSnackAlert } from "../../hooks/useSnackAlert";
import { useRouter } from "next/router";

const UserLogs = () => {
  const { navOpen, setLoading } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [logsData, setlogsData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const showSnackAlert = useSnackAlert();  
  const router = useRouter();
  const [order, setOrder] = React.useState<any>("DESC");
  const [orderBy, setOrderBy] = React.useState<any>("timestamp");
  const [refresh, setRefresh] = React.useState(false);
  
  useEffect(() => {
    setLoading(true);
    if(typeof(router.query.user_id) != "undefined")
    {
      // ADMIN_REPORT_API.post("admin/user-management/fetch-logs", {
      //   no_of_records: rowsPerPage,
      //   page_no: page,
      //   user_id: router.query.user_id
      // }).then((res) => {
      //   setLoading(false);
      //   setlogsData(res?.data)
      // });
    }
  }, [page, rowsPerPage, router.query.user_id]);

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

           {/* table */}
           <div style={{ marginTop: 30 }}>
           <UserLogsTable
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  rows={logsData?.data}
                  countRecords={logsData?.total_matched}
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

export default UserLogs;

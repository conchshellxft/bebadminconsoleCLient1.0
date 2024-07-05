import { Button, TablePagination, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LeftNav from "../../components/LeftNav";
import TopNav from "../../components/TopNav";
import { DIMENSIONS } from "../../constants/Dimensions";
import { AppContext } from "../_app";
// import { ADMIN_REPORT_API } from "../../constants/Api";
import ActivationRequestCard from "../../components/UserManagement/ActivationRequestCard";

const SalesReport = () => {
  const { navOpen, setLoading } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("DESC");
  const [orderBy, setOrderBy] = useState("timestamp");
  const [activationRequestData, setActivationRequestData] = useState<any>({});
  const [activationRequestReasonSelfie, setActivationRequestReasonSelfie] = useState<any>({});
  const [activationRequestReasonCard, setActivationRequestReasonCard] = useState<any>({});
  const [refresh, setRefresh] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setLoading(true);
  //   ADMIN_REPORT_API.post("admin/user-management/activation-request", {
  //     page_no: page,
  //     no_of_records: rowsPerPage,
  //     sort: {
  //       field: "joining_timestamp",
  //       type: "ASC",
  //     },
  //   }).then((res1) => {
  //     console.log("1");
  //     console.log(res1?.data);
  //     setActivationRequestData(res1?.data);
    
  //     ADMIN_REPORT_API.get("/admin/user-management/list-activation-request-reject-reason?type=selfie")
  //     .then((res2) => {
  //       console.log("2");
  //       console.log(res2?.data);
  //       setActivationRequestReasonSelfie(res2?.data?.data);
  //       ADMIN_REPORT_API.get("/admin/user-management/list-activation-request-reject-reason?type=card")
  //       .then((res3) => {
  //         console.log("3");
  //         console.log(res3?.data);
  //         setLoading(false);
  //         setActivationRequestReasonCard(res3?.data?.data)
  //       });
  //     });
    
  //  })

    
    
  }, [page, rowsPerPage, order, orderBy, refresh]);
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

        {/* filter */}
        <div style={{ width: "100%", overflow: "scroll" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              columnGap: 20,
              alignItems: "center",
              padding: 20,
            }}
          >
            {/* <div
              style={{
                display: "flex",
                columnGap: 10,
                justifyContent: "center",
              }}
            >
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
                  setSearchQuery("");
                  setPage(0);
                }}
                size="small"
                variant="contained"
                style={{ backgroundColor: "#EFEFEF", color: "black" }}
              >
                Reset
              </Button>
            </div> */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                style={{ fontSize: 18 }}
                color="primary.100"
                variant="subtitle2"
              >
                Pending Activation Request :
              </Typography>
              &nbsp;&nbsp;
              <Typography style={{ fontSize: 20 }}>
                {activationRequestData?.total_matched}
              </Typography>
            </div>
          </div>

          {/* main content */}
          <div
            style={{
              backgroundColor: "#F3F4F8",
              padding: "2vh 2vw",
              minHeight: "calc(100vh - 170px)",
            }}
          >
            <div>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                component="div"
                count={activationRequestData?.total_matched ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>

            {activationRequestData.data &&
              activationRequestData.data.map((item: any) => {
                return (
                  <div key={item._id} style={{ marginBottom: 30 }}>
                    <ActivationRequestCard
                      {...{
                        data: item,
                        order,
                        setOrder,
                        orderBy,
                        setOrderBy,
                        setRefresh,
                       // activationRequestReasonSelfie,
                      //  activationRequestReasonCard
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;

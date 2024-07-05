import { Button, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import LeftNav from "../../components/LeftNav";
import TopNav from "../../components/TopNav";
import { DIMENSIONS } from "../../constants/Dimensions";
import { AppContext } from "../_app";
// import { ADMIN_API, API, BASE_URL } from "../../constants/Api";
import ControlTable from "../../components/Content/controlTable";
import { AddAdminFile } from "../../components/Content/addAdminFile";

const AdminFiles = () => {
  const { navOpen, setLoading } = useContext(AppContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [serviceData, setServiceData] = React.useState<any>({});
  const [adminFileToUpdate, setAdminFileToUpdate] = React.useState(null);
  const [order, setOrder] = React.useState<any>(null);
  const [orderBy, setOrderBy] = React.useState<any>(null);
  const [refresh, setRefresh] = React.useState<any>(false);

  useEffect(() => {
    setLoading(true);
    console.log("apis triggered");

    // ADMIN_API.get(`admin/configuration/service-state`)
    // .then((res) => {
    //     setLoading(false);
    //     setServiceData(res?.data.services)
    // })
    // .catch((error) => console.log("error", error));
  }, [page, rowsPerPage, order, orderBy, refresh]);

  // console.log(promotionsData);

  const [open, setOpen] = React.useState(false);

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
          <div style={{ backgroundColor: "#F3F4F8", padding: "2vw" }}>
            <div>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                  p: 2,
                }}
              >
                Service Controls
              </Paper>

              <ControlTable
                services={serviceData}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFiles;

import { Button, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import LeftNav from "../../components/LeftNav";
import TopNav from "../../components/TopNav";
import { DIMENSIONS } from "../../constants/Dimensions";
import { AppContext } from "../_app";
// import { ADMIN_API, API, BASE_URL } from "../../constants/Api";
import AdminFilesTable from "../../components/Content/adminFilesTable";
import { AddAdminFile } from "../../components/Content/addAdminFile";

const AdminFiles = () => {
  const { navOpen, setLoading } = useContext(AppContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [adminFiles, setAdminFilesData] = React.useState<any>({});
  const [adminFileToUpdate, setAdminFileToUpdate] = React.useState(null);
  const [order, setOrder] = React.useState<any>(null);
  const [orderBy, setOrderBy] = React.useState<any>(null);
  const [refresh, setRefresh] = React.useState<any>(false);

  useEffect(() => {
    setLoading(true);
    console.log("apis triggered");

    // ADMIN_API.post(`admin/configuration/admin-files`,{
    //     page_no: page,
    //     no_of_records: rowsPerPage
    // })
    // .then((res) => {
    //     setLoading(false);
    //     setAdminFilesData(res.data)
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
                <Typography color="primary.100" variant="h6">
                  Files{" "}
                </Typography>
                <Button
                  onClick={() => {
                    setOpen(true);
                    setAdminFileToUpdate(null);
                  }}
                  sx={{ width: 100 }}
                >
                  Add
                </Button>
                <AddAdminFile
                  {...{ open, setOpen, adminFileToUpdate, refresh, setRefresh }}
                />
              </Paper>

              <AdminFilesTable
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={adminFiles?.data}
                countRecords={adminFiles?.data?.length}
                adminFileToUpdate={adminFileToUpdate}
                setAdminFileToUpdate={setAdminFileToUpdate}
                setOpen={setOpen}
                order={order}
                setOrder={setOrder}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
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

import { Button, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import LeftNav from "../../components/LeftNav";
import TopNav from "../../components/TopNav";
import { DIMENSIONS } from "../../constants/Dimensions";
import { AppContext } from "../_app";
// import { ADMIN_API, API, BASE_URL } from "../../constants/Api";
import ExtraGuideTable from "../../components/Content/extraGuideTable";
import { AddExtraGuide } from "../../components/Content/addExtraGuide";

const Promotions = () => {
  const { navOpen, setLoading } = useContext(AppContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [extraGuideData, setExtraGuideData] = React.useState<any>({});
  const [extraGuideToUpdate, setExtraGuideToUpdate] = React.useState(null);
  const [order, setOrder] = React.useState<any>(null);
  const [orderBy, setOrderBy] = React.useState<any>(null);
  const [refresh, setRefresh] = React.useState(false);
  const [data, setData] = React.useState();
  const [updatedData, setUpdatedData] = React.useState();


  // useEffect(() => {
  //   setLoading(true);
  //   console.log("apis triggered");

  //   ADMIN_API.get(`admin/configuration/extra-guide`)
  //     .then((res) => {
  //       setLoading(false);
  //       setExtraGuideData(res.data)
  //     })
  //     .catch((error) => console.log("error", error));
  // }, [page, rowsPerPage, order, orderBy, refresh]);

  console.log(extraGuideData);

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
                  Extra Guide:{" "}
                </Typography>
                <Button
                  onClick={() => {
                    setOpen(true);
                    setExtraGuideToUpdate(null);
                  }}
                  sx={{ width: 100 }}
                >
                  Add
                </Button>
                <AddExtraGuide
                  {...{ open, setOpen, extraGuideToUpdate, setRefresh }}
                />
              </Paper>

              <ExtraGuideTable
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={extraGuideData.data}
                countRecords={extraGuideData.total_matched}
                extraGuideToUpdate={extraGuideToUpdate}
                setExtraGuideToUpdate={setExtraGuideToUpdate}
                setOpen={setOpen}
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
  );
};

export default Promotions;

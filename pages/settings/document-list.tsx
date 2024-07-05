import { Button, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import LeftNav from "../../components/LeftNav";
import TopNav from "../../components/TopNav";
import { DIMENSIONS } from "../../constants/Dimensions";
import { AppContext } from "../_app";
// import { API, BASE_URL } from "../../constants/Api";
import DocumentListTable from "../../components/documentListTable";
import { AddDocumentList } from "../../components/addDocumentList";

const Promotions = () => {
  const { navOpen } = useContext(AppContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [documentListData, setDocumentListData] = React.useState<any>({});
  const [documentToUpdate, setDocumentToUpdate] = React.useState(null);
  const [order, setOrder] = React.useState<any>(null);
  const [orderBy, setOrderBy] = React.useState<any>(null);

  useEffect(() => {
    console.log("apis triggered");

    // API.get(
    //   `${BASE_URL}global/get-document-list?page_no=${page}&no_of_records=${rowsPerPage}&sort_field=${orderBy}&sort_type=${order}`
    // )
    //   .then((res) => setDocumentListData(res.data))
    //   .catch((error) => console.log("error", error));
  }, [page, rowsPerPage, order, orderBy]);

  console.log(documentListData);

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
                  Document List:{" "}
                </Typography>
                <Button
                  onClick={() => {
                    setOpen(true);
                    setDocumentToUpdate(null);
                  }}
                  sx={{ width: 100 }}
                >
                  Add
                </Button>
                <AddDocumentList {...{ open, setOpen, documentToUpdate }} />
              </Paper>

              <DocumentListTable
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={documentListData.data}
                countRecords={documentListData.no_of_records}
                documentToUpdate={documentToUpdate}
                setDocumentToUpdate={setDocumentToUpdate}
                setOpen={setOpen}
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

export default Promotions;

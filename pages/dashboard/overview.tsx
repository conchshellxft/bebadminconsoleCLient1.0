import {
    Divider,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Table,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useContext, useEffect, useState } from "react";
  import LeftNav from "../../components/LeftNav";
//   import SampleChart from "../../components/SampleChart";
//   import EnhancedTable from "../../components/Table";
  import TopNav from "../../components/TopNav";
  import { DIMENSIONS } from "../../constants/Dimensions";
  import { AppContext } from "../_app";
  import { DatePicker } from "@mui/x-date-pickers";
  import { add, sub } from "date-fns";
//   import { API, ADMIN_REPORT_API } from "../../constants/Api";
//   import XLSX from "xlsx";
//   import FileSaver from "file-saver";
  
  const Overview = () => {
    const { navOpen, setLoading } = useContext(AppContext);
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    const [timePeriod, setTimePeriod] = React.useState("month");
    const [productCode, setProductCode] = React.useState<string | null>("all");
    const [analyticsData, setAnalyticsData] = React.useState<any>(null);
    const [products, setProducts] = React.useState<any>("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState<any>("DESC");
    const [orderBy, setOrderBy] = React.useState<any>("timestamp");
  
    // useEffect(() => {
    //   setLoading(true);
    //   // console.log("apis triggered");
    //   ADMIN_REPORT_API.get("admin/dashboard/products").then((res) => {
    //     setProducts(res.data.data);
    //   });
  
    //   ADMIN_REPORT_API.post("admin/dashboard/analytics", {
    //     time_period: timePeriod,
    //     page_no: page,
    //     no_of_records: rowsPerPage,
    //     ...(startDate && { start_date: startDate }),
    //     ...(endDate && { end_date: endDate }),
    //     ...(productCode !== "all" && { product_id: productCode }),
    //     sort: { field: orderBy, type: order },
    //   }).then((res) => {
    //     setLoading(false);
    //     setAnalyticsData(res?.data?.data?.total_sales)}
    //   );
    // }, [
    //   startDate,
    //   endDate,
    //   timePeriod,
    //   productCode,
    //   page,
    //   rowsPerPage,
    //   order,
    //   orderBy,
    // ]);
  
    // const onExportHandler = () => {
    //   const fileType =
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    //   const fileExtension = ".xlsx";
  
    //   const exportFormShape = [];
    //   // console.log(analyticsData);
    //   for (let i = 0; i < analyticsData.show_labels.length; i++) {
    //     exportFormShape.push({
    //       month: analyticsData?.show_labels[i],
    //       sales: analyticsData?.data[i],
    //     });
    //   }
    //   exportFormShape.push({
    //     sales: analyticsData?.data.reduce(
    //       (total: number, item: number) => total + item
    //     ),
    //   });
    //   const ws = XLSX.utils.json_to_sheet(exportFormShape);
  
    //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    //   const excelBuffer = XLSX.write(wb, {
    //     bookType: "xlsx",
    //     type: "array",
    //   });
  
    //   const data = new Blob([excelBuffer], { type: fileType });
    //   FileSaver.saveAs(data, "Analytics Graph" + fileExtension);
    // };
  
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
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                columnGap: 20,
                // backgroundColor: "white",
                padding: 20,
              }}
            >
             <DatePicker
              label="StartDate"
              inputFormat={"dd/MM/yyyy"}
              value={startDate}
              maxDate={endDate ? sub(endDate, { days: 0 }) : new Date()}
              onChange={(newValue: any) => {
                setStartDate(new Date(newValue.setHours(0,0,0,0)));
              }}
              renderInput={(params:any) => <TextField size="small" {...params} />}
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
              renderInput={(params:any) => <TextField size="small" {...params} />}
            />
            </div>
            <div style={{ backgroundColor: "#F3F4F8", padding: "3vw" }}>
              <div>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Total Sales:</Typography>
                  <div style={{ display: "flex", columnGap: 20 }}>
                    <Paper style={{ width: "15vw" }}>
                      <FormControl fullWidth style={{}}>
                        <InputLabel id="demo-simple-select-label">
                          Time Period
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={timePeriod}
                          label="Time Period"
                          size="small"
                          onChange={(e) => setTimePeriod(e.target.value)}
                        >
                          <MenuItem value={"hour"}>Hour</MenuItem>
                          <MenuItem value={"day"}>Day</MenuItem>
                          <MenuItem value={"month"}>Month</MenuItem>
                          <MenuItem value={"year"}>Year</MenuItem>
                        </Select>
                      </FormControl>
                    </Paper>
                    <Paper style={{ width: "15vw" }}>
                      <FormControl fullWidth size="small" style={{}}>
                        <InputLabel id="demo-simple-select-label">
                          Product
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="productCode"
                          value={productCode}
                          label="Product Code"
                          size="small"
                          onChange={(e) => setProductCode(e.target.value)}
                          sx={{ maxHeight: 100 }}
                          MenuProps={{
                            sx: {
                              maxHeight: 500,
                            },
                          }}
                        >
                          <MenuItem value={"all"}>All</MenuItem>
                          {products !== "" &&
                            products.map((product: any) => {
                              return (
                                <MenuItem
                                  key={product.name}
                                  value={product.product_id}
                                >
                                  {product.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </Paper>
                  </div>
                </div>
                <Paper sx={{ mb: 10 }}>
                  {/* <SampleChart
                    labels={analyticsData?.show_labels}
                    data={analyticsData?.data}
                  /> */}
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 20,
                    }}
                  >
                    <Typography>
                      Total Sales (RM):{" "}
                      <span
                        style={{
                          font: "normal normal bold 28px/34px Helvetica Neue",
                          color: "#59A631",
                          marginLeft: 10,
                        }}
                      >
                        {analyticsData?.total}
                      </span>
                    </Typography>
                    <div style={{ display: "flex" }}>
                      <Typography
                        style={{ cursor: "pointer" }}
                        onClick={() => {}}
                      >
                        Download Excel Sheet
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </div>
              <div>
                <div style={{ padding: 10 }}>
                  <Typography variant="h6">Transaction Details:</Typography>
                </div>
                {/* <EnhancedTable
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  rows={analyticsData?.transactions}
                  countRecords={analyticsData?.total_matched}
                  order={order}
                  setOrder={setOrder}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Overview;
  
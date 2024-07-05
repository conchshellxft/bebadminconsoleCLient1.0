import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
// import { ADMIN_API, API } from "../../constants/Api";
import { useSnackAlert } from "../../hooks/useSnackAlert";
import copy from "copy-to-clipboard";  



var TOPUP = false, BILL_PAYMENT = false, SEND_MONEY = false, EARNING_TO_MAIN_TRANSFER = false, RELOAD_MAIN_WALLET = false;

export default function ControlTable({
  services,
  setRefresh
}: any) {

  TOPUP = services['TOPUP'];
  BILL_PAYMENT = services['BILL_PAYMENT'];
  SEND_MONEY = services['SEND_MONEY'];
  EARNING_TO_MAIN_TRANSFER = services['EARNING_TO_MAIN_TRANSFER'];
  RELOAD_MAIN_WALLET = services['RELOAD_MAIN_WALLET'];

  const showSnackAlert = useSnackAlert();

  const updateServiceState = (service: string) => {
  
    var state = false;

    if(service == "TOPUP")
    {
      TOPUP = !TOPUP;
      state = TOPUP;
    }
    
    if(service == "BILL_PAYMENT")
    {
      BILL_PAYMENT = !BILL_PAYMENT;
      state = BILL_PAYMENT;
    }

    if(service == "SEND_MONEY")
    {  
      SEND_MONEY = !SEND_MONEY;
      state = SEND_MONEY;
    }

    if(service == "EARNING_TO_MAIN_TRANSFER")
    {
      EARNING_TO_MAIN_TRANSFER = !EARNING_TO_MAIN_TRANSFER;
      state = EARNING_TO_MAIN_TRANSFER;
    }

    if(service == "RELOAD_MAIN_WALLET")
    {
      RELOAD_MAIN_WALLET = !RELOAD_MAIN_WALLET;
      state = RELOAD_MAIN_WALLET;
    }

    // ADMIN_API.post("admin/configuration/update-service-state", {
    //   service: service,
    //   state: state
    // })
    //   .then((res) => {
    //     showSnackAlert("success", "Status updated successfully!");
    //     setRefresh((prevState: any) => !prevState)
    //   })
    //   .catch((res) => showSnackAlert("error", "Failed updating status!"));
  };

  return (

          
            <TableBody sx={{ width: "50%" }}> 
              <TableRow
                style={{
                backgroundColor: "white",
                height: 30
              }}>
                <TableCell style={{whiteSpace:"nowrap"}}>
                  <Button
                    style={{ backgroundColor: TOPUP==true ? "green" : "red", marginRight: 10 }}
                    onClick={() => updateServiceState("TOPUP")}>
                      TOPUP
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow
                style={{
                backgroundColor: "white",
                height: 30
              }}>
                <TableCell style={{whiteSpace:"nowrap"}}>
                  <Button
                    style={{ backgroundColor: BILL_PAYMENT==true ? "green" : "red", marginRight: 10 }}
                    onClick={() => updateServiceState("BILL_PAYMENT")}>
                      BILL PAYMENT
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow
                style={{
                backgroundColor: "white",
                height: 30
              }}> 
                <TableCell style={{whiteSpace:"nowrap"}}>
                  <Button
                    style={{ backgroundColor: SEND_MONEY==true ? "green" : "red", marginRight: 10 }}
                    onClick={() => updateServiceState("SEND_MONEY")}>
                      SEND MONEY
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow
                style={{
                backgroundColor: "white",
                height: 30
              }}>
                <TableCell style={{whiteSpace:"nowrap"}}>
                  <Button
                    style={{ backgroundColor: EARNING_TO_MAIN_TRANSFER==true ? "green" : "red", marginRight: 10 }}
                    onClick={() => updateServiceState("EARNING_TO_MAIN_TRANSFER")}>
                      EARNING TO MAIN TRANSFER
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow
                style={{
                backgroundColor: "white",
                height: 30
              }}>
                <TableCell style={{whiteSpace:"nowrap"}}>
                  <Button
                    style={{ backgroundColor: RELOAD_MAIN_WALLET==true ? "green" : "red", marginRight: 10 }}
                    onClick={() => updateServiceState("RELOAD_MAIN_WALLET")}>
                      RELOAD MAIN WALLET
                  </Button>
                </TableCell>
              </TableRow>    
            </TableBody>
  );
}

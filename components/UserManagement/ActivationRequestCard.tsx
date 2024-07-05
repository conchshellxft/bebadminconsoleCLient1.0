import {
  Button,
  Paper,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Image from "next/image";
// import { API, BASE_URL, ADMIN_REPORT_API } from "../../constants/Api";
import { useRouter } from "next/router";
import { useSnackAlert } from "../../hooks/useSnackAlert";
import ActivationRequestImageCard from "./ActivationRequestImageModal";

const borderRight = "0.1px solid rgba(0, 0, 0, 0.08)";

export default function ActivationRequestCard({
  data,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  setRefresh,
//  activationRequestReasonSelfie,
//  activationRequestReasonCard
}: any) {

 
  const breakTable = useMediaQuery("(min-width:950px)");
  var phone_approve = false;

  if (data.phone_verified == true) phone_approve = true;

  var [verificationData, setVerificationData] = useState({
    phone_number: {
      verified: data.phone_verified,
      approve: phone_approve,
    },
    ID: {
      approve: true,
      remarks: "",
    },
    profile: {
      approve: true,
      remarks: "",
    },
  });
  const [accountStatus, setAccountStatus] = useState<any>(null);
  const router = useRouter();
  const showSnackAlert = useSnackAlert();
  const [open, setOpen] = useState(false);

  /*
  useEffect(() => {
    ADMIN_REPORT_API.post("admin/user-management/activation-request", {
      userId: router.query.userId as string,
    }).then((res) => setAccountStatus(res.data.data));
  }, []);
  */

  const onProceed = () => {
    if(verificationData.ID.remarks == "")
      verificationData.ID.approve = true;
    if(verificationData.profile.remarks == "")
      verificationData.profile.approve = true;

    // ADMIN_REPORT_API.post("admin/user-management/approve-activation-request", {
    //   user_id: data.user_id,
    //   stages: verificationData,
    // }).then((res) => {
    //   setRefresh((prevState: any) => !prevState);
    //   return res;
    // });
    // showSnackAlert("success", "Activation Status Updated!");
  };

  // const step1Completed = accountStatus?.step1_verification === "Completed";
  const step2Completed = data?.document_type ? true : false;
  const step3Completed = data?.selfie ? true : false;

  const headCells = [
    {
      label: "Date & Time",
      id: "joining_timestamp",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Referral Code",
      id: "referral_code",
    },
  ];

  return (
    <Paper style={{ background: "white" }}>
      {/* row 1 */}
      <ActivationRequestImageCard {...{ open, setOpen, data }} />
      <div
        style={{
          display: "flex",
          backgroundColor: "#EFF5FB",
          justifyContent: "space-between",
        }}
      >
        {headCells.map((headCell, index) => (
          <Typography
            key={headCell.id}
            style={{ flex: index === 0 ? 1 : 1.2, padding: 15, borderRight }}
            color="primary"
            variant="subtitle2"
          >
            <TableSortLabel
              active={orderBy ? orderBy === headCell.id : false}
              direction={order === "ASC" ? "asc" : "desc"}
              onClick={() => {
                setOrder(order && order === "ASC" ? "DESC" : "ASC");
                setOrderBy(headCell.id);
              }}
            >
              {headCell.label}
            </TableSortLabel>
          </Typography>
        ))}
        {/* <Typography
          style={{ flex: 1, padding: 15, borderRight }}
          color="primary"
          variant="subtitle2"
        >
          Date & Time
        </Typography>
        <Typography
          style={{ flex: 1.2, padding: 15, borderRight }}
          variant="subtitle2"
        >
          Name
        </Typography>
        <Typography style={{ flex: 1.2, padding: 15 }} variant="subtitle2">
          Referral Code
        </Typography> */}
      </div>

      {/* row 2 */}
      <div
        style={{
          display: "flex",
          // backgroundColor: "#EFF5FB",
          justifyContent: "space-between",
          // padding: 15,
        }}
      >
        <Typography
          style={{ flex: 1, padding: 15, borderRight }}
          color="primary"
          variant="subtitle2"
        >
          {data.account_status_update_time &&
            format(
              new Date(data.account_status_update_time),
              "dd-MM-yyyy | HH:mm:ss"
            )}
        </Typography>
        <Typography
          style={{ flex: 1.2, padding: 15, borderRight }}
          variant="subtitle2"
        >
          {data.name}
        </Typography>
        <Typography style={{ flex: 1.2, padding: 15 }} variant="subtitle2">
          {data.referral_code}
        </Typography>
      </div>
      <div
        style={{
          display: breakTable ? "flex" : "block",
          // flexWrap: "wrap",
          backgroundColor: "#F0F0F0",
          justifyContent: "space-between",
        }}
      >
        {/* step 1 */}
        {/* <div style={{flex: 1, borderRight}}> */}
        <div
          style={{
            flex: 1,
            padding: 19,
            borderRight: "0.1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography variant="subtitle2">Step 1 - Phone Number </Typography>
          <br />
          <div style={{ textAlign: "center", width: "100%" }}>
            <Typography>Phone Number</Typography>
            <Typography variant="h6">{data.phone_number}</Typography>
            <Typography
              color={data.phone_verified ? "primary.200" : "red"}
              variant="overline"
            >
              {data.phone_verified ? "Verified" : "Not Verified"}
            </Typography>
          </div>
          &nbsp;
          <div style={{ textAlign: "center", width: "100%" }}>
            <Typography>Email</Typography>
            <Typography variant="h6">{data.email}</Typography>
          </div>

          <div style={{ margin: "20px 0px", textAlign: "center" }}>
            <Typography color="primary.100">User Report Number:</Typography>
            <Typography variant="subtitle1">
              {data.user_report_no === "" ? "NA" : data.user_report_no}
            </Typography>
            <Typography color="primary.100">Issue:</Typography>
            <Typography variant="subtitle1">
              {data.user_report_issue === "" ? "NA" : data.user_report_no}
            </Typography>
          </div>
        </div>
        {/* </div> */}

        {/* Step - 2 */}
        <div style={{ flex: 1.2, padding: 20, borderRight }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Step 2 - ID/Passport </Typography>
            <Typography variant="subtitle2">
              Type: Identification Card
            </Typography>
          </div>
          <br />
          <div
            style={{
              textAlign: "center",
              // width: "100%",
              display: "flex",
              justifyContent: "center",
              // flexWrap: "wrap",
              // width: "35vw",
              // maxWidth: 800
            }}
          >
            {data?.card_images.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  style={{
                    border: "1px dotted black",
                    marginRight: 10,
                    padding: 2,
                    cursor: 'pointer'
                  }}
                >
                  <Image
                    onClick={() => setOpen(true)}
                    unoptimized
                    loader={() => item}
                    src={item}
                    width={248}
                    height={160}
                  />
                </div>
              );
            })}
            
            {/* <div
              style={{
                border: "1px dotted black",
                marginRight: 10,
                padding: 2,
              }}
            > */}
            {/* <Image src="/Image_29.png" width={248} height={160} /> */}
            {/* <Image
                loader={() => data?.card_images[0]}
                src={data?.card_images[0]}
                width={248}
                height={160}
              />
            </div> */}
            {/* <div
              style={{
                border: "1px dotted black",
                marginRight: 10,
                padding: 2,
              }}
            > */}
            {/*<Image src="/Image_57.png" width={248} height={160} />*/}
            {/* <Image
                loader={() => data?.card_images[1]}
                src={data?.card_images[1]}
                width={248}
                height={160}
              />
            </div> */}
          </div>
          <div style={{ margin: "20px 0px", textAlign: "center" }}>
            <Typography color="primary.100">{data.card_name}</Typography>
            <Typography color="primary.100">{data.card_number}</Typography>
            {/* <Typography color="primary.100">Name: Jacintha Kimberley Rajah</Typography>
            <Typography color="primary.100">IC/Passport Num: 550106-1205821</Typography> */}
          </div>
         
        </div>

        {/* Step - 3 */}
        <div style={{ flex: 1.2, padding: 20 }}>
          <div
          // style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="subtitle2">Step 3 - Selfie</Typography>
          </div>
          <br />
          <div
            style={{
              textAlign: "center",
              width: "100%",
              display: "flex",
            }}
          >
            <div
              style={{
                border: "1px dotted black",
                // marginRight: 10,
                padding: 2,
                margin: "0px auto",
                width: "50%",
                display: "flex",
              }}
            >
              {/* <Image
                src="/Image 29.png"
                width={248}
                height={160}
              /> */}
              <Image unoptimized src={data?.selfie} width={248} height={160} />
            </div>
          </div>
         
        </div>
      </div>

      {/* approve decline row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#F0F0F0",
          // justifyContent: "space-between",
        }}
      >
        <div
          style={{
            textAlign: "center",
            // marginBottom: 10,
            flex: 1,
            padding: 19,
            borderRight,
            paddingTop: 46,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <Button variant="outlined" style={{ background: "#F5F5F5" }}>
              Contact via WhatsApp
            </Button>
          </div>
          
           <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={(e: any) =>
                {
                  /*
                  setVerificationData({
                    ...verificationData,
                    phone_number: { verified: true, approve: true },
                  })
                  */
                }
              }
              disabled={data?.phone_verified}
              variant="outlined"
              style={{
                background: "#F5F5F5",
                marginRight: 10,
                border: verificationData.phone_number.approve
                  ? "2px solid #66AB2D"
                  : "",
              }}
            >
              Approve
            </Button>
            <Button
              onClick={(e: any) =>
                {
                  /*
                  setVerificationData({
                    ...verificationData,
                    phone_number: { verified: false, approve: false },
                  })
                  */
                }
              }
              disabled={data?.phone_verified}
              variant="outlined"
              style={{
                background: "#F5F5F5",
                border: !verificationData.phone_number.approve
                  ? "2px solid #66AB2D"
                  : "",
              }}
            >
              Decline
            </Button>
           
          </div>
          
        </div>

        <div
          style={{
            textAlign: "center",
            // marginBottom: 10,
            flex: 1.2,
            padding: 20,
            borderRight,
          }}
        >
          <div style={{ marginBottom: 10 }}>
          {(data?.account_decline) && (<span style={{ color:"red"}}>Last Remarks: {data?.account_decline?.card?.remarks}</span>)}
            <Typography style={{ textAlign: "left" }}>Remarks: </Typography>
            <TextField
              onChange={(e: any) =>{
                if(e.target.value == "")
                {
                  setVerificationData({
                    ...verificationData,
                    ID: { remarks: e.target.value, approve: true },
                  })
                }
                else
                {
                  setVerificationData({
                    ...verificationData,
                    ID: { remarks: e.target.value, approve: false },
                  })
                }
              }}
              fullWidth
              size="small"
              style={{ background: "white" }}
            />
              <select>
                {
                /*activationRequestReasonCard &&
                  activationRequestReasonCard.map((item: any) => {
                    <option>{item.reason}</option>
                  })
                */}
              </select>
        </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={(e: any) =>{
                if(e.target.value == "")
                {
                  setVerificationData({
                    ...verificationData,
                    ID: { remarks: e.target.value, approve: true },
                  })
                }
                else
                {
                  setVerificationData({
                    ...verificationData,
                    ID: { remarks: e.target.value, approve: false },
                  })
                }
              }}
              disabled={step2Completed || verificationData.ID.remarks !== ""}
              variant="outlined"
              style={{
                background: "#F5F5F5",
                marginRight: 10,
                border: verificationData.ID.approve ? "2px solid #66AB2D" : "",
              }}
            >
              Approve
            </Button>
            
            <Button
              disabled={step2Completed}
              variant="outlined"
              style={{
                background: "#F5F5F5",
                border:
                  verificationData.ID.remarks != "" ? "2px solid #66AB2D" : "",
              }}
            >
              Decline
            </Button>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            // marginBottom: 10,
            flex: 1.2,
            padding: 20,
          }}
        >
          <div style={{ marginBottom: 10 }}>
          {(data?.account_decline) && (<span style={{ color:"red"}}>Last Remarks: {data?.account_decline?.selfie?.remarks}</span>)}
            <Typography style={{ textAlign: "left" }}>Remarks: </Typography>
            <TextField
              onChange={(e: any) =>{
                if(e.target.value == "")
                {
                  setVerificationData({
                    ...verificationData,
                    profile: { remarks: e.target.value, approve: true },
                  })
                }
                else
                {
                  setVerificationData({
                    ...verificationData,
                    profile: { remarks: e.target.value, approve: false },
                  })
                }
              }}
              fullWidth
              size="small"
              style={{ background: "white" }}
            />
            <select>
                {
                /*activationRequestReasonSelfie &&
                  activationRequestReasonSelfie.map((item: any) => {
                    <option>{item.reason}</option>
                  })
                */
                }
              </select>
              
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              disabled={
                step3Completed || verificationData.profile.remarks != ""
              }
              onClick={(e: any) =>{
                if(e.target.value == "")
                {
                  setVerificationData({
                    ...verificationData,
                    profile: { remarks: e.target.value, approve: true },
                  })
                }
                else
                {
                  setVerificationData({
                    ...verificationData,
                    profile: { remarks: e.target.value, approve: false },
                  })
                }
              }}
              variant="outlined"
              style={{
                background: "#F5F5F5",
                marginRight: 10,
                border: verificationData.profile.approve
                  ? "2px solid #66AB2D"
                  : "",
              }}
            >
              Approve
            </Button>
            <Button
              disabled={step3Completed}
              variant="outlined"
              style={{
                background: "#F5F5F5",
                border:
                  verificationData.profile.remarks != ""
                    ? "2px solid #66AB2D"
                    : "",
              }}
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "right",
          padding: 10,
          background: "#F0F0F0",
          borderTop: borderRight,
        }}
      >
        <Button onClick={() => onProceed()} sx={{ width: 200 }}>
          Proceed
        </Button>
      </div>
    </Paper>
  );
}

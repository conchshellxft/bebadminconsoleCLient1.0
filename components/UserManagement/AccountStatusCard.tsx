import { Button, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter } from "next/router";
// import { API, BASE_URL, ADMIN_REPORT_API } from "../../constants/Api";
import ActivationRequestImageCard from "./ActivationRequestImageModal";

const borderRight = "0.1px solid rgba(0, 0, 0, 0.10)";

export default function AccountStatusCard({ setShowAccountStatusCard }: any) {
  const router = useRouter();
  const [data, setData] = useState<any>({
    // phoneNumber: "",
    // phoneNumberVerif: "",
    // profileImage: null
  });

  const [modalData, setModalData] = useState<any>({
  });;

  useEffect(() => {
    // ADMIN_REPORT_API.post("admin/user-management/verification-details", {
    //   user_id: router.query.userId as string,
    // }).then((res) => {
    //   setData(res.data.data)
    // });
  }, []);

  const [open, setOpen] = useState(false);

  const verificationCompleted =
    data?.step1?.phone_verified &&
    data?.step2?.document_type &&
    data?.step3?.selfie;
  // false;

  return (
    <Paper style={{ background: "white" }}>
      {/* row 1 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: borderRight,
        }}
      >
        <div style={{ display: "flex", padding: 15 }}>
          <KeyboardArrowLeftIcon
            onClick={() => setShowAccountStatusCard(false)}
            style={{ marginRight: 10, cursor: "pointer" }}
          />
          <Typography variant="body1"> Verification Details </Typography>
        </div>
        <div style={{ display: "flex", padding: 15 }}>
          <Typography color="primary.100"> Account Status: </Typography>
          &nbsp;&nbsp;
          <Typography
            color={data?.account_status === "APPROVED" ? "primary.200" : "red"}
            variant="body1"
          >
            {data?.account_status}
          </Typography>
        </div>
      </div>

      {/* row 2 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="subtitle1">Step 1 Verification: </Typography>
            &nbsp;&nbsp;&nbsp;
            <Typography
              color={data?.step1?.phone_verified ? "primary.200" : "red"}
              variant="subtitle1"
            >
              {data?.step1?.phone_verified ? "Completed" : "Not Completed"}
            </Typography>
          </div>
          <br />
          <div style={{ textAlign: "center", width: "100%" }}>
            <Typography>Phone Number</Typography>
            <Typography variant="h6">+{data?.step1?.country_code}-{data?.step1?.phone_number}</Typography>
            <Typography
              color={data?.step1?.phone_verified ? "primary.200" : "red"}
              variant="overline"
            >
              {data?.step1?.phone_verified ? "Verified" : "Not Verified"}
            </Typography>
          </div>
          {/*
            <div style={{ margin: "20px 0px", textAlign: "center" }}>
            <Typography color="primary.100">User Report Number:</Typography>
            <Typography variant="subtitle1">
              {data?.user_report_name === "" ? "-" : data?.user_report_name}
            </Typography>
            <Typography color="primary.100">Issue:</Typography>
            <Typography variant="subtitle1">
              {data?.user_report_issue === "" ? "-" : data?.user_report_issue}
            </Typography>
          </div>
          */}
         
        </div>
        {/* </div> */}

        {/* Step - 2 */}
        <div style={{ flex: 1.2, padding: 20, borderRight }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="subtitle1">Step 2 Verification: </Typography>
            &nbsp;&nbsp;&nbsp;
            <Typography
              color={data?.step2?.document_type ? "primary.200" : "red"}
              variant="subtitle1"
            >
              {data?.step2?.document_type ? "Completed" : "Not Completed"}
            </Typography>
          </div>
          <br />
          <div
            style={{
              textAlign: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                border: "1px dotted black",
                marginRight: 10,
                padding: 2,
              }}
            >
              {/* <Image src="/Image 29.png" width={248} height={160} /> */}
              {data?.step2?.document_type =="ID_CARD"
              && (
                <Image
                  unoptimized
                  onClick={() => setOpen(true)}
                  src={data?.step2?.card_images[0]}
                  width={248}
                  height={160}
                />
              )}
              {data?.step2?.document_type =="PASSPORT"
              && (
                <Image
                  unoptimized
                  onClick={() => setOpen(true)}
                  src={data?.step2?.card_images[0]}
                  width={248}
                  height={160}
                />
              )}
            </div>
            <div
              style={{
                border: "1px dotted black",
                marginRight: 10,
                padding: 2,
              }}
            >
              {/* <Image src="/Image 57.png" width={248} height={160} /> */}
              {data?.step2?.document_type =="ID_CARD" && (
                <Image
                  unoptimized
                  onClick={() => setOpen(true)}
                  src={data?.step2?.card_images[0]}
                  width={248}
                  height={160}
                />
              )}
            </div>
          </div>
          <div style={{ margin: "20px 0px", textAlign: "center" }}>
            <Typography color="primary.100"><b>Document Type: </b>{data?.step2?.document_type}</Typography>
            <Typography color="primary.100"><b>Name: </b>{data?.step2?.card_name}</Typography>
              {data?.step2?.document_type =="ID_CARD" && (<Typography color="primary.100">
                  <b>ID Card Number: </b><span>{data?.step2?.card_number}</span>
                  </Typography>)} 
              {data?.step2?.document_type =="PASSPORT" && (<Typography color="primary.100">
                  <b>PASSPORT Number: </b><span>{data?.step2?.card_number}</span>
                  </Typography>)} 
            {/* <Typography color="primary.100">{data.legalName}</Typography>
            <Typography color="primary.100">{data.legalId}</Typography> */}
          </div>
        </div>

        {/* Step - 3 */}
        <div style={{ flex: 1.2, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="subtitle1">Step 3 Verification: </Typography>
            &nbsp;&nbsp;&nbsp;
            <Typography
              color={data?.step3?.selfie ? "primary.200" : "red"}
              variant="subtitle1"
            >
              {data?.step3?.selfie ? "Completed" : "Not Completed"}
            </Typography>
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
              {data?.step3?.selfie && (
                <Image
                  unoptimized
                  src={data?.step3?.selfie}
                  width={248}
                  height={160}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
          padding: 10,
          borderTop: borderRight,
        }}
      >
        {/*
         <Button
          // variant="outlined"
          style={{
            width: 300,
            backgroundColor: verificationCompleted ? "#EFEFEF" : "#59A630",
            color: verificationCompleted ? "#C3C0C0" : "white",
          }}
          disabled={verificationCompleted}
          >
            Proceed to Activation Request
          </Button>
        */}
       
      </div>
    </Paper>
  );
}

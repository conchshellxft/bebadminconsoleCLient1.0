import {
  Button,
  Divider,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
// import { API } from "../constants/Api";
import { useSnackAlert } from "../hooks/useSnackAlert";
import { useRouter } from "next/router";

export const AddDocumentList = ({ open, setOpen, documentToUpdate }: any) => {
  console.log(documentToUpdate);
  const [data, setData] = React.useState({
    id: "",
    name: "",
    numberOfImages: "",
    imageDescription: "",
  });
  const showSnackAlert = useSnackAlert();
  const router = useRouter();

  useEffect(() => {
    setData({
      id: documentToUpdate ? documentToUpdate.id : "",
      name: documentToUpdate ? documentToUpdate.name : "",
      numberOfImages: documentToUpdate ? documentToUpdate.quantity : "",
      imageDescription: documentToUpdate ? documentToUpdate.description : "",
    });
  }, [documentToUpdate]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "550px",
    height: "400px",
    bgcolor: "white",
    outline: 0,
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
  };

  const updateDocumentList = () => {
    const reqBody = {
      id: documentToUpdate._id,
      name: data.name,
      description: data.imageDescription,
      quantity: data.numberOfImages,
    };
    // API.post("update-document-list", reqBody)
    //   .then((res) => {
    //     showSnackAlert("success", "Document updated successfully!");
    //     setOpen(false);
    //     setTimeout(() => {
    //       router.reload();
    //     }, 1000);
    //   })
    //   .catch((res) => showSnackAlert("error", "Failed updating document!"));
  };

  const addDocumentList = async () => {
    const reqBody = {
      name: data.name,
      description: data.imageDescription,
      quantity: data.numberOfImages,
    };
    // API.post("add-new-document-list", reqBody)
    //   .then((res) => {
    //     showSnackAlert("success", "Document added successfully!");
    //     setOpen(false);
    //     setTimeout(() => {
    //       router.reload();
    //     }, 1000);
    //   })
    //   .catch((res) => showSnackAlert("error", "Failed adding document!"));
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="add impacct"
      aria-describedby="adding iimmpact to the wallet"
    >
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CloseIcon
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div style={{ padding: "15px 30px" }}>
          <Typography variant="h5">
            {documentToUpdate ? "Update Document List" : "Add Document List"}
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: 20,
              marginTop: 30,
            }}
          >
            <Typography>Name: </Typography>
            &nbsp;&nbsp;&nbsp;
            <TextField
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
              value={data?.name}
              defaultValue={0}
              style={{ width: 280 }}
              size="small"
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <Typography>Number of Images: </Typography>
            &nbsp;&nbsp;&nbsp;
            <TextField
              onChange={(e) => {
                setData({ ...data, numberOfImages: e.target.value });
              }}
              value={data?.numberOfImages}
              defaultValue={0}
              style={{ width: 280 }}
              size="small"
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <Typography>Image Description: </Typography>
            &nbsp;&nbsp;&nbsp;
            <TextField
              onChange={(e) => {
                setData({ ...data, imageDescription: e.target.value });
              }}
              value={data?.imageDescription}
              defaultValue={0}
              style={{ width: 280 }}
              size="small"
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          {/* <div
            style={{
              display: "flex",
              //   alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography>Image: </Typography>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={(e) => imageHandler(e)}
              name="fileUpload"
              id="fileUpload"
              hidden
            />
            &nbsp;&nbsp;&nbsp;
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 260,
                width: 280,
                cursor: "pointer",
                // background: "#FFFFFF 0% 0% no-repeat padding-box",
                // boxShadow: "0px 0px 5px #0000004D",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: 10,
                marginBottom: 20,
              }}
              onClick={() => fileRef.current.click()}
            >
              {data?.image || selectedImage ? (
                <img
                  src={selectedImage ? (selectedImage as string) : data?.image}
                  style={{ height: "100%", width: "100%" }}
                />
              ) : (
                <Image src="/Svg/Solid.svg" width={25} height={25} />
              )}
            </div>
          </div> */}
        </div>
        <Divider />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
            paddingRight: 20,
          }}
        >
          <Button
            onClick={() =>
              documentToUpdate ? updateDocumentList() : addDocumentList()
            }
          >
            {documentToUpdate ? "Update" : "Add"}
          </Button>
          <Button
            onClick={() =>
              setData({
                id: "",
                name: "",
                numberOfImages: "",
                imageDescription: "",
              })
            }
            style={{
              backgroundColor: "#EFEFEF",
              color: "black",
              marginLeft: 10,
            }}
          >
            Reset
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

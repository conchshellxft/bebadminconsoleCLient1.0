import { Button, Divider, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
// import { ADMIN_API, API } from "../../constants/Api";
import { useSnackAlert } from "../../hooks/useSnackAlert";
import { useRouter } from "next/router";

export const AddAdminFile = ({
  open,
  setOpen,
  fileToUpdate,
  refresh,
  setRefresh,
}: any) => {
  const [data, setData] = React.useState({
    image: ""
  });
  const fileRef = React.useRef<any>(null);
  const [selectedImage, setSelectedImage] = React.useState<
    string | ArrayBuffer
  >("");
  const showSnackAlert = useSnackAlert();
  const router = useRouter();

  useEffect(() => {
    if (!fileToUpdate) setSelectedImage("");
    setData({
      image: fileToUpdate ? fileToUpdate.image : "",
    });
  }, [fileToUpdate]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "620px",
    bgcolor: "white",
    outline: 0,
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
  };

  const imageHandler = (e: any) => {
    // setFiles(e.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(reader.result as string);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("image", fileRef.current.files[0]);
    // ADMIN_API.post(`admin/configuration/upload-admin-file`, data, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((res) => {
    //     setOpen(false);
    //     setRefresh((prevState: any) => !prevState)
    //   })
    //   .catch((err) => console.log(err));
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
            Add File
          </Typography>
          <div
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
          </div>
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
              uploadImage()
            }
          >
            Add
          </Button>
          <Button
            onClick={() => setData({image: ""})}
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

import React, { useContext, useEffect, useState } from "react";
import LeftNav from "../../components/LeftNav";
import TopNav from "../../components/TopNav";
import { DIMENSIONS } from "../../constants/Dimensions";
import { AppContext } from "../_app";
import { EditorComponent } from "../../components/RichTextEditor";
import { Button } from "@mui/material";
import { useSnackAlert } from "../../hooks/useSnackAlert";
import { useRouter } from "next/router";
// import { ADMIN_API, API, BASE_URL } from "../../constants/Api";

const HelpCenter = () => {
  const { navOpen, setLoading } = useContext(AppContext);
  const [data, setData] = useState();
  const [updatedData, setUpdatedData] = useState();
  const showSnackAlert = useSnackAlert();
  const router = useRouter();
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    console.log("apis triggered");

    // ADMIN_API.get("admin/configuration/fetch-help-center")
    //   .then((res) => {
    //     setLoading(false);
    //     setData(res.data.data)
    //   })
    //   .catch((error) => console.log("error", error));
  }, []);

  const saveHelpCenter = async () => {
    setLoading(true);
    // ADMIN_API.post("admin/configuration/update-help-center", {
    //   content: updatedData,
    // })
    //   .then((res) => {
    //     setLoading(false);
    //     showSnackAlert("success", "Data updated successfully!");
    //     setRefresh((prevState: any) => !prevState);
    //   })
    //   .catch((res) => showSnackAlert("error", "Failed updating data!"));
  };

  return (
    <div style={{ height: "100vh" }}>
      <TopNav />
      <div
        style={{
          display: "flex",
          height: `calc(100vh - ${DIMENSIONS.TOPNAV_HIEGHT})`,
          backgroundColor: "#F3F4F8",
        }}
      >
        <div>{navOpen && <LeftNav />}</div>

        <div style={{ width: "100%", overflowY: "scroll" }}>
          <div style={{ padding: "2vw" }}>
            <div>
              <EditorComponent {...{ data, setData, setUpdatedData }} />
              <Button onClick={() => saveHelpCenter()} sx={{ mt: 3 }}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

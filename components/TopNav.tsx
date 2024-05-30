import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import format from "date-fns/format";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { DIMENSIONS } from "../constants/Dimensions";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../pages/_app";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { API, ADMIN_REPORT_API } from "../constants/Api";


const TopNav = (props: any) => {
  const router = useRouter();
  // const [ navOpen, setNavOpen ] = useState(true);
  const { navOpen, setNavOpen } = useContext(AppContext);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const { breadCrumbs } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activationCount, setActivationCount] = useState(0);

  // console.log(user);

  useEffect(() => {
    // console.log(getFilteredRoutes());
    // setBreadcrumbs(tempBreadcrumb);
    setBreadcrumb(
      breadCrumbs?.find((url: any) => url.url === router.route)?.data ?? []
    );
    // if (!breadCrumbs?.find((url: any) => url.url === router.route)) {
      // console.log("cannot find breadcrumb");
      // router.back();
      // setBreadcrumb(userRoutes[0].data);
      // // tempBreadcrumb.push(userRoutes[0]);
      // console.log(tempBreadcrumb, router.route);
    // }
  }, [breadCrumbs]);

//   useEffect(() => {
//     ADMIN_REPORT_API.get('admin/user-management/activation-request-count')
//     .then((res:any) => {
//       console.log(res?.data)
//       setActivationCount(res?.data?.total_activations);
//     })
//     .catch((error) => console.log('error', error));
//   }, [activationCount])


  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(new Date());
    }, 60000);
  }, [currentTime]);

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 15px 15px 0px",
        color: "#707070",
        height: DIMENSIONS.TOPNAV_HIEGHT,
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 3px 15px #0000004D",
        opacity: 1,
      }}
    >
      <div style={{ display: "flex", columnGap: 20, alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            textAlign: "left",
            padding: 16,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#FAFBFD",
            minWidth: `calc(${DIMENSIONS.LEFTNAV_WIDTH} - 1px)`,
            height: DIMENSIONS.TOPNAV_HIEGHT,
            boxShadow: navOpen ? "0px 3px 15px #00000029" : "none",
          }}
        >
          <Image src="/logo.png" alt="/logo.png" height={50} width={150} />
          <IconButton onClick={() => setNavOpen(!navOpen)} style={{}}>
            {navOpen ? (
              <MenuOpenIcon sx={{ color: "#0051A0" }} />
            ) : (
              <MenuIcon sx={{ color: "#0051A0" }} />
            )}
          </IconButton>
        </div>
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="none" color="inherit">
              Admin
            </Link>
            {breadcrumb.map((item: any) => {
              return (
                <Link
                  underline={item.url ? "hover" : "none"}
                  color="inherit"
                  // href={item.url}
                  style={item.url && { cursor: "pointer" }}
                  onClick={() => router.push(item.url)}
                  id={item.name}
                  key={item.name}
                >
                  {item.name}
                </Link>
              );
            })}
          </Breadcrumbs>
        </div>
      </div>
      <div style={{ display: "flex", columnGap: 20, alignItems: "center" }}>
        <Typography style={{ margin: 0 }}>
          {format(currentTime, "HH:mm | E, d MMMM yyyy")}
        </Typography>
        {/* <NotificationsIcon /> */}
        {/* <div> */}
        {/* <Image
          height={25}
          width={25}
          src="/Notification icon.svg"
          alt="alert icon"
        />
        <Image
          height={25}
          width={25}
          src="/message icon.svg"
          alt="message icon"
        /> */}
        {/* </div> */}
        {/* <SmsIcon /> */}
        <div style={{ display: "flex" }}>
          <Avatar
            sizes="small"
            sx={{ bgcolor: "orange", width: 45, height: 45 }}
          >
            SG
          </Avatar>
          <div 
            style={{ paddingTop: 10, paddingLeft: 10 }}>
          {(activationCount==0 && <NotificationsIcon/>)}
            {(activationCount!=0 && (<span><NotificationsActiveIcon/><sup>{activationCount}</sup>&nbsp;&nbsp;</span>))}
          </div>

          <div
            style={{ paddingTop: 10, paddingLeft: 10, cursor: "pointer" }}
            onClick={() => {
              router.push("/sign-in");
              localStorage.clear();
            }}
          >
            <Tooltip title="Logout">
              <LogoutIcon />
            </Tooltip>
          </div>
        </div>
        <div>
          <Typography style={{ fontWeight: "bold", margin: 0, color: "black" }}>
            {"Sekhar G"}
          </Typography>
          <span style={{ fontWeight: "lighter" }}>
            {"Root"}
          </span>
        </div>
      </div>
    </Paper>
  );
};

export default TopNav;

import {
    Collapse,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  import { useContext, useEffect, useRef, useState } from "react";
  import { ExpandLess, ExpandMore } from "@mui/icons-material";
  import { useRouter } from "next/dist/client/router";
  import Link from 'next/link'
  import { ROUTES, USER_ROUTES } from "../constants/Route";
  import { AppContext } from "../pages/_app";
  import { DIMENSIONS } from "../constants/Dimensions";
  import AppsIcon from "@mui/icons-material/AppsOutlined";
  import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
  import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
  import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
  import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
  
  const NavListItem = (props: any) => {
    const [open, setOpen] = useState(true);
    const router = useRouter();
  
    return (
      <>
        <ListItemButton
          style={{ marginBottom: 0 }}
          onClick={() => setOpen((open) => !open)}
        >
          <ListItemIcon>
            {props.name === "Dashboard" && (
              <AppsIcon style={{ color: "rgb(0, 0, 0, 0.15)" }} />
            )}
            {props.name === "Users" && (
              <ConnectWithoutContactOutlinedIcon
                style={{ color: "rgb(0, 0, 0, 0.15)" }}
              />
            )}
            {props.name === "Settings" && (
              <SettingsOutlinedIcon style={{ color: "rgb(0, 0, 0, 0.15)" }} />
            )}
            {props.name === "Finance" && (
              <AccountBalanceOutlinedIcon
                style={{ color: "rgb(0, 0, 0, 0.15)" }}
              />
            )}
            {props.name === "Content" && (
              <ContentPasteOutlinedIcon style={{ color: "rgb(0, 0, 0, 0.15)" }} />
            )}
            {props.icon && (
              <img src={props.icon} alt="icons" height={25} width={25} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              <span
                style={{
                  fontFamily: "Helvetica Neue Medium",
                  fontWeight: "bold",
                  fontSize: 16,
                  letterSpacing: 0,
                  // font: "normal normal bold 18px/23px Helvetica Neue"
                }}
              >
                {props.name}
              </span>
            }
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {props.links.map((link: any) => {
              return (
                <Link key={link.url} href={link.url}>
                <a
                  href={link.url}
                  key={link.url}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemButton
                    id={link.name}
                    key={link.name}
                    autoFocus={link.name === props.redirectId}
                    sx={{ pl: 9 }}
                    // onClick={() =>
                    //   router.push(link.url, undefined, { shallow: true })
                    // }
                    style={{
                      backgroundColor: router.route.includes(link.url)
                        ? "#FFA500"
                        : "inherit",
                    }}
                  >
                    <ListItemText
                      primary={
                        <span
                          style={{
                            color: router.route.includes(link.url)
                              ? "#FFFFFF"
                              : "#6C6C6C",
                          }}
                        >
                          {link.name}
                        </span>
                      }
                    />
                  </ListItemButton>
                </a>
                </Link>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  };
  
  const LeftNav = () => {
    const { navOpen, setNavOpen } = useContext(AppContext);
    const [filteredRoutes, setFilteredRoutes] = useState<any>([]);
    const router = useRouter();
  
    useEffect(() => {
      let filteredRoutes = ROUTES;
      // console.log(filteredRoutes);
      if (filteredRoutes) setFilteredRoutes(filteredRoutes);
    }, []);
  
    // const getFilteredRoutes = () => {
    //   if (localStorage.getItem("permission_type") === "ROOT") {
    //     setFilteredRoutes(ROUTES);
    //     localStorage.setItem("fileteredRoutes", JSON.stringify(ROUTES));
    //   } else if (localStorage.getItem("permission_type") === "CUSTOM") {
    //     // filteredRoutes.push();
    //     let tempRoutes: any = [];
    //     ROUTES.forEach((route) => {
    //       let links = route.links.filter((link) =>
    //         ["DASHBOARD_OVERVIEW", "REPORTS_DONATIONS"].includes(link.apiIdentifier)
    //       );
    //       if (links.length > 0) {
    //         tempRoutes.push({
    //           name: route.name,
    //           icon: route.icon,
    //           links,
    //         });
    //       }
    //       console.log(tempRoutes);
    //     });
    //     setFilteredRoutes(tempRoutes);
    //     localStorage.setItem("fileteredRoutes", JSON.stringify(tempRoutes));
    //   } else if (localStorage.getItem("permission_type") === "ADMIN") {
    //     const permissableRoutes = [
    //       "REPORTS_ALL_TRANSACTIONS",
    //       "REPORTS_SALES_REPORT",
    //       "REPORTS_SALES_SUMMARY",
    //       "REPORTS_PRODUCT_SUMMARY",
    //       "REPORTS_PRODUCT_OUTSTANDING",
    //       "REPORTS_MAIN_WALLET",
    //       "REPORTS_EARNING_WALLET",
    //       "REPORTS_DONATIONS",
    //       "REPORTS_EXPENSES",
    //     ];
    //     let tempRoutes: any[] = [];
    //     ROUTES.forEach((route) => {
    //       let links = route.links.filter((link) =>
    //         permissableRoutes.includes(link.apiIdentifier)
    //       );
    //       if (links.length > 0) {
    //         tempRoutes.push({
    //           name: route.name,
    //           icon: route.icon,
    //           links,
    //         });
    //       }
    //       setFilteredRoutes(tempRoutes);
    //       localStorage.setItem("fileteredRoutes", JSON.stringify(tempRoutes));
    //     });
    //   }
    // }
    const { breadCrumbs, user } = useContext(AppContext);
  
    // console.log(breadCrumbs);
    // console.log(
    //   breadCrumbs &&
    //     breadCrumbs
    //       .find((breadcrumb: any) => breadcrumb.url === router.route)
    //       .data.find((item: any) => item.url === router.route).name
    // );
  
    // console.log(breadCrumbs);
    let redirectId =
      breadCrumbs &&
      breadCrumbs
        .find((breadcrumb: any) => breadcrumb.url === router.route)
        ?.data.find((item: any) => item.url === router.route)?.name;
  
    // const [redirectId, setRedirectId] = useState("");
    // const redirectRef = useRef<any>();
  
    // useEffect(() => {
    //   console.log("effect triggered");
    //   console.log(redirectId);
    //   // setRedirectId(
    //   //   breadCrumbs &&
    //   //     breadCrumbs
    //   //       .find((breadcrumb: any) => breadcrumb.url === router.route)
    //   //       .data.find((item: any) => item.url === router.route).name
    //   // );
    //   redirectRef.current.click();
    // }, [breadCrumbs]);
  
    return (
      <Drawer
        onScroll={(e) => {
          e.stopPropagation();
          e.bubbles = false;
        }}
        sx={{
          width: DIMENSIONS.LEFTNAV_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DIMENSIONS.LEFTNAV_WIDTH,
            boxSizing: "border-box",
            boxShadow: "0px 3px 15px #00000029",
            display: "block",
            position: "relative",
            // overflowY: "scroll",
            "::-webkit-scrollbar": {
              display: "none",
            },
            height: `calc(100vh - ${DIMENSIONS.TOPNAV_HIEGHT})`,
          },
        }}
        variant="persistent"
        anchor="left"
        open={navOpen}
      >
        <List>
          {filteredRoutes.map((item: any) => {
            return (
              <NavListItem key={item.name} {...item} redirectId={redirectId} />
            );
          })}
        </List>
      </Drawer>
    );
  };
  
  export default LeftNav;
  
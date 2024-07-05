import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Avatar, Divider, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/router";
// import { truncate_str, truncate_str_view } from "../../constants/Api";

export default function UserProfileCard({
  userProfile,
  setShowAccountStatusCard,
  setUserId,
}: any) {
  const accountSummaryLeftContainerData: any[] = [
    // {
    //   key: "User Id",
    //   value: userProfile?.user_id
    // },
    // {
    //   key: "Main Wallet Balance (RM)",
    //   value: truncate_str_view(userProfile?.wallet?.main_wallet_amount),
    // },
    // {
    //   key: "Cashback & Referral Earning Wallet Balance (RM)",
    //   value: truncate_str_view(userProfile?.wallet?.cashback_wallet_amount),
    // },
    // {
    //   key: "Receive Money Wallet Balance (RM)",
    //   value: truncate_str_view(userProfile?.wallet?.receive_money_wallet_amount),
    // },
    // {
    //   key: "Today's Referral Earning Wallet Balance (RM)",
    //   value: truncate_str_view(userProfile?.wallet?.todays_referral_earning_wallet_amount),
    // },
    // {
    //   key: "Total Amount (RM) of Earning To Main Wallet Transfer",
    //   value: truncate_str_view(userProfile?.earning_to_main?.total),
    // },
    // {
    //   key: "Total Amount (RM) of Sent Money",
    //   value: truncate_str_view(userProfile?.send_money?.total),
    // },
    // {
    //   key: "Total Amount (RM) of Received Money",
    //   value: truncate_str_view(userProfile?.received_money?.total),
    // },
  ];

  const accountSummaryRightContainerData: any[] = [
    // {
    //   key: "Number Of FPX Transactions",
    //   value: userProfile?.reload_wallet?.count,
    // },
    // {
    //   key: "Total Amount (RM) of Main Wallet Reloads",
    //   value: truncate_str_view(userProfile?.reload_wallet?.total),
    // },
    // {
    //   key: "Total Sales (RM)",
    //   value: truncate_str_view(userProfile?.sales?.total),
    // },
    // {
    //   key: "Total Donations (RM)",
    //   value: truncate_str_view(userProfile?.donation?.total),
    // },
    // {
    //   key: "Total Net Profit (RM)",
    //   value: truncate_str(userProfile?.profit),
    // },
  ];
  // console.log(userProfile);
  const router = useRouter();
  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        // alignItems: "center",
        padding: "20px 0px",
      }}
    >
      {/* left section */}

      <div
        style={{
          flexBasis: 1,
          flexGrow: 1,
          display: "flex",
          padding: "20px 0px",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          style={{
            height: "12vw",
            width: "12vw",
            border: "5px solid #71B02D",
            marginBottom: 5,
          }}
          // alt="Remy Sharp"
          src={userProfile?.profile_image}
        />
        <Typography variant="h5">{userProfile?.name}</Typography>
        <br />
        <Typography color="primary.100">
          Last Login:{" "}
          {userProfile?.metrics?.last_active && format(
            new Date(userProfile?.metrics?.last_active),
            "dd-MM-yyyy | HH:mm:ss"
          )}
        </Typography>
        
          {(userProfile?.referrer?.user_id != "") && (
            <div style={{ marginTop: "3vh" }}>
            <Typography color="primary.100">Referrer: </Typography>
            {/* <br/> */}
            <Typography>
              {userProfile?.referrer?.name} {userProfile?.referrer?.referral_code}
            </Typography>
            <br />
              <a
              style={{
              display: "flex",
              justifyContent: "space-around",
              background: "#EFEFEF 0% 0% no-repeat padding-box",
              padding: 5,
              cursor: "pointer"
            }}
              target="_blank"
              rel="noreferrer"
              href={`/user-management/user-list/user-profile?userId=${userProfile?.referrer?.user_id}`}
            >
            <Typography>View Referrer</Typography>
              <KeyboardArrowRightIcon />
            </a>   
            </div> 
          )}
      </div>
      <Divider orientation="vertical" flexItem />

      {/* right section */}

      <div style={{ flexBasis: 3, flexGrow: 3, padding: "0px 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 20px 20px 20px",
          }}
        >
          <div>
            <Typography color="primary.100">
              Referral Code:{" "}
              <span style={{ color: "black" }}>
                &nbsp;&nbsp;{userProfile?.referral_code}
              </span>
            </Typography>
            <Typography color="primary.100">
              Joined:{" "}
              <span style={{ color: "black" }}>
                &nbsp;&nbsp;
                {userProfile?.joining_timestamp &&
                  format(
                    new Date(userProfile?.joining_timestamp),
                    "dd-MM-yyyy | HH:mm:ss"
                  )}
              </span>
            </Typography>
          </div>
          <div>
            <Typography color="primary.100">
              Phone Number:{" "}
              <span style={{ color: "black" }}>
                &nbsp;&nbsp;{userProfile?.phone_number}
              </span>
            </Typography>
            <Typography color="primary.100">
              Email:{" "}
              <span style={{ color: "black" }}>
                &nbsp;&nbsp;{userProfile?.email}
              </span>
            </Typography>
          </div>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "2vw",
              flexGrow: 1,
              marginBottom: 10,
            }}
          >
            <Typography color="primary.100">
              Account Status:{" "}
              <span
                style={{
                  color:
                    userProfile?.account_status === "APPROVED"
                      ? "#71B02D"
                      : "red",
                }}
              >
                &nbsp;&nbsp;{userProfile?.account_status}
              </span>
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                background: "#EFEFEF 0% 0% no-repeat padding-box",
                padding: 10,
                cursor: "pointer",
              }}
              onClick={() => setShowAccountStatusCard(true)}
            >
              <Typography>View Details</Typography>
              <KeyboardArrowRightIcon />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "2vw",
              flexGrow: 1,
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            <Typography color="primary.100">
              Total Referrals:{" "}
              <span style={{ color: "black" }}>
                &nbsp;&nbsp;{userProfile?.referral_count}
              </span>
            </Typography>
            <a
            style={{
            display: "flex",
            justifyContent: "space-around",
            background: "#EFEFEF 0% 0% no-repeat padding-box",
            padding: 10,
            cursor: "pointer"
           }}
            target="_blank"
            rel="noreferrer"
            href={`/user-management/user-list/user-profile/referrals?user_id=${userProfile?.user_id}&name=${userProfile?.name}`}
          >
            <Typography>View List</Typography>
            <KeyboardArrowRightIcon />
          </a>    
          </div>
        </div>

        {/* Account Summary container */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: "5vw",
            background: "#FAFAFA 0% 0% no-repeat padding-box",
            padding: 10,
            marginBottom: 30,
          }}
        >
          {/* left container */}
          <div style={{ flexGrow: 1 }}>
            {accountSummaryLeftContainerData.map((item) => {
              console.log(userProfile);
             if(item['key']== "Today's Referral Earning Wallet Balance (RM)")
             {
               return (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Typography color="primary.100">{item.key}: </Typography>
                  <Typography style={{ color: "black" }}>
                    <a
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                      target="_blank"
                      rel="noreferrer"
                      href={`/reports/todays-referrals?user_id=${userProfile?.user_id}&day=${new Date()}&name=${userProfile?.name}`}
                    >
                      {item.value}
                    </a>      
                  </Typography>
                </div>
                )
              }
              else
              {
                return (
                  <div
                    key={item.key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <Typography color="primary.100">{item.key}: </Typography>
                    <Typography style={{ color: "black" }}>
                      {item.value}
                    </Typography>
                  </div>
                  )
                }
             }
            )}

          </div>

          {/* right container */}
          <div style={{ flexGrow: 1 }}>
            {accountSummaryRightContainerData.map((item) => {
              return (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Typography color="primary.100">{item.key}: </Typography>
                  <Typography
                    style={{
                      color:
                        item.key === "Total Net Profit (RM)"
                          ? "green"
                          : "black",
                    }}
                  >
                    {item.value}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              background: "#EFEFEF 0% 0% no-repeat padding-box",
              padding: 5,
              cursor: "pointer",
              maxWidth: 200,
              marginLeft: "auto",
            }}
          >
            <Typography>View User Reports</Typography>
            <KeyboardArrowRightIcon />
          </div>
        </div>
      </div>
    </Paper>
  );
}

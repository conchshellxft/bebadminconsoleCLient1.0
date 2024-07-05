import { useEffect, useState } from "react";
import { ADMIN_REPORT_API } from "../constants/Api";


export const useOverviewData = (date: Date, setLoading:any) => {
  const [dashboardData, setDashboardData] = useState({
    count_overall_users: 0,
    count_month_users: 0,
    count_overall_orders: 0,
    count_month_orders: 0,
    amount_overall_send_money: "0.00",
    amount_month_send_money: "0.00",
    amount_overall_sales: "0.00",
    amount_month_sales: "0.00",
    total_wallet: {
      earning_wallet_amount:"0.00",
      main_wallet_amount: "0.00",
      cashback_wallet_amount: "0.00",
      receive_money_wallet_amount: "0.00",
      todays_referral_earning_wallet_amount: "0.00",
      positive_amount: "0.00",
      negative_amount: "0.00"
    },
    total_donate: "0.00",
    inactive_accounts: {
      total_count: 0,
      total_main_wallet_amount: "0.00",
      total_cashback_wallet_amount: "0.00",
      total_receive_money_wallet_amount: "0.00",
      total_todays_referral_earning_wallet_amount: "0.00",
    },
    fpx: {
      amount_overall_reload_wallet: "0.00",
      amount_month_reload_wallet: "0.00",
      count_overall_reload_wallet: 0,
      count_month_reload_wallet: 0,
    },
    credit_card: {
      amount_overall_reload_wallet: "0.00",
      amount_month_reload_wallet: "0.00",
      count_overall_reload_wallet: 0,
      count_month_reload_wallet: 0,
    },
    earning_to_main: {
      amount_overall_reload_wallet: "0.00",
      amount_month_reload_wallet: "0.00",
      count_overall_reload_wallet: 0,
      count_month_reload_wallet: 0,
    },
    iimmpact_balance: "0.00",
    overall_net_profit: "0.00",
    overall_profit: "0.00",
    month_profit: "0.00",
    month_net_profit: "0.00"
  });

  useEffect(() => {
    const getDashboardData = async () => {
      setLoading(true);
      try {
        const dashboardApiResponse = await ADMIN_REPORT_API.post(
          "admin/dashboard/overview",
          {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
          }
        );
        setLoading(false);
        setDashboardData(dashboardApiResponse.data.data);
      } catch (error) {
        console.log(error);
      }
      // console.log(dashboardData);
    };
    getDashboardData();
  }, [date.getMonth()]);

  const totalMonthDataAndTotalMonthCount = [
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank",
      text: "Total Amount of Wallet Reload",
      value: (Number(dashboardData?.fpx?.amount_overall_reload_wallet) + Number(dashboardData?.credit_card?.amount_overall_reload_wallet) + 
          Number(dashboardData?.earning_to_main?.amount_overall_reload_wallet)).toFixed(2),
      summaryData: [
        {
          text: "via FPX",
          value: dashboardData?.fpx?.amount_overall_reload_wallet,
        },
        {
          text: "via Credit Card",
          value: dashboardData?.credit_card?.amount_overall_reload_wallet,
        },
        {
          text: "via Earning Wallet",
          value: dashboardData?.earning_to_main?.amount_overall_reload_wallet,
        },
      ],
    },
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank",
      text: "Amount of Wallet Reload in this month",
      value: (Number(dashboardData?.fpx?.amount_month_reload_wallet) + Number(dashboardData?.credit_card?.amount_month_reload_wallet) + 
        Number(dashboardData?.earning_to_main?.amount_month_reload_wallet)).toFixed(2),
      summaryData: [
        {
          text: "via FPX",
          value: dashboardData?.fpx?.amount_month_reload_wallet,
        },
        {
          text: "via Credit Card",
          value: dashboardData?.credit_card?.amount_month_reload_wallet,
        },
        {
          text: "via Earning Wallet",
          value: dashboardData?.earning_to_main?.amount_month_reload_wallet,
        },
      ],
    },
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank",
      text: "Total Number of Wallet Reloads",
      value: dashboardData?.fpx?.count_overall_reload_wallet + dashboardData?.credit_card?.count_overall_reload_wallet + 
        dashboardData?.earning_to_main?.count_overall_reload_wallet,
      summaryData: [
        {
          text: "via FPX",
          value: dashboardData?.fpx?.count_overall_reload_wallet,
        },
        {
          text: "via Credit Card",
          value: dashboardData?.credit_card?.count_overall_reload_wallet,
        },
        {
          text: "via Earning Wallet",
          value: dashboardData?.earning_to_main?.count_overall_reload_wallet,
        },
      ],
    },
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank",
      text: "Number of Wallet Reloads in this month",
      value: dashboardData?.fpx?.count_month_reload_wallet + dashboardData?.credit_card?.count_month_reload_wallet + 
        dashboardData?.earning_to_main?.count_month_reload_wallet,
      summaryData: [
        {
          text: "via FPX",
          value: dashboardData?.fpx?.count_month_reload_wallet,
        },
        {
          text: "via Credit Card",
          value: dashboardData?.credit_card?.count_month_reload_wallet,
        },
        {
          text: "via Earning Wallet",
          value: dashboardData?.earning_to_main?.count_month_reload_wallet,
        },
      ]
    },
    {
      src: "/Svg/001-user.svg",
      alt: "bank",
      text: "Total Balance in Earning Wallet",
      value: dashboardData?.total_wallet?.earning_wallet_amount,
      summaryData: [
        {
          text: "Total Balance in Cashback & Referral Earning Wallet (RM)",
          value:  dashboardData?.total_wallet.cashback_wallet_amount
        },
        {
          text: "Total Balance in Receive Money Wallet (RM)",
          value: dashboardData?.total_wallet.receive_money_wallet_amount
        },
        {
          text: "Total Positive Balance in Earning Wallet (RM)",
          value: dashboardData?.total_wallet.positive_amount
        },
        {
          text: "Total Negative Balance in Earning Wallet (RM)",
          value: dashboardData?.total_wallet.negative_amount
        }
      ]
    }
  ];  

  /*
    const totalMonthDataAndTotalMonthCount = [
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank",
      text: "Total FPX Wallet Reload",
      value: dashboardData?.fpx?.amount_overall_reload_wallet,
      summaryData: [
        {
          text: "Total FPX Wallet Reload",
        //  Month FPX Wallet Reload",
          value: dashboardData?.fpx?.amount_month_reload_wallet,
        },
        {
          text: "Total Credit Card Wallet Reload",
          //Total Number of FPX Wallet Reload",
          value: dashboardData?.fpx?.count_overall_reload_wallet,
        },
        {
          text: "Month Number of FPX Wallet Reload",
          value: dashboardData?.fpx?.count_month_reload_wallet,
        },
      ],
    },
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank",
      text: "Total Credit Card Wallet Reload",
      value: dashboardData?.credit_card?.amount_overall_reload_wallet,
      summaryData: [
        {
          text: "Month Credit Card Wallet Reload",
          value: dashboardData?.credit_card?.amount_month_reload_wallet,
        },
        {
          text: "Total Number of Credit Card Wallet Reload",
          value: dashboardData?.credit_card?.count_overall_reload_wallet,
        },
        {
          text: "Month Number of Credit Card Wallet Reload",
          value: dashboardData?.credit_card?.count_month_reload_wallet,
        },
      ],
    },
    {
      src: "/Svg/Group 8555.svg",
      alt: "bank",
      text: "Total Earning Wallet Reload",
      value: dashboardData?.earning_to_main?.amount_overall_reload_wallet,
      summaryData: [
        {
          text: "Month Earning Wallet Reload",
          value: dashboardData?.earning_to_main?.amount_month_reload_wallet,
        },
        {
          text: "Total Number of Earning Wallet Reload",
          value: dashboardData?.earning_to_main?.count_overall_reload_wallet,
        },
        {
          text: "Month Number of Earning Wallet Reload",
          value: dashboardData?.earning_to_main?.count_month_reload_wallet,
        },
      ],
    },
  ];
  */

  const totalInactiveAccountsData = {
    src: "/Svg/001-user.svg",
    alt: "bank",
    text: "Total Number of Inactive Accounts",
    value: dashboardData?.inactive_accounts?.total_count,
    summaryData: [
      {
        text: "Total Main Wallet Balance (RM) in Inactive Accounts",
        value: dashboardData?.inactive_accounts?.total_main_wallet_amount,
      },
      {
        text: "Total Earning Wallet Balance (RM) in Inactive Accounts",
        value: dashboardData?.inactive_accounts?.total_cashback_wallet_amount,
      },
      {
        text: "Total Receive Money Wallet Balance (RM) in Inactive Accounts",
        value: dashboardData?.inactive_accounts?.total_receive_money_wallet_amount,
      },
      {
        text: "Total Today's Referral Earning Wallet Balance (RM) in Inactive Accounts",
        value: dashboardData?.inactive_accounts?.total_todays_referral_earning_wallet_amount,
      }
    ]
  };

  const totalAndMonthData = [
    {
      src: "/Svg/Group 9993.svg",
      alt: "bank",
      text: "Number of user's joined in this Month",
      total: dashboardData?.count_overall_users,
      month: dashboardData?.count_month_users,
    },
    {
      src: "/Svg/Group 9994.svg",
      alt: "bank",
      text: "Number of orders in this month",
      total: dashboardData?.count_overall_orders,
      month: dashboardData?.count_month_orders,
    },
    {
      src: "/Svg/send-message.svg",
      alt: "bank",
      text: "Amount of money sent in this month",
      total: dashboardData?.amount_overall_send_money,
      month: dashboardData?.amount_month_send_money,
    },
    {
      src: "/Svg/001-price-tag.svg",
      alt: "bank",
      text: "Amount of sales in this month",
      total: dashboardData?.amount_overall_sales,
      month: dashboardData?.amount_month_sales,
    }
  ];

  const totalCardData = [
    {
      src: "/DashboardOverview/Immpacct Logo.png",
      alt: "profit icon",
      text: "Total Balance in IIMMPACT (RM)",
      total: dashboardData?.iimmpact_balance,
    },
  ];

  const totalAndMonthData2 = [
    {
      src: "/Svg/007-graph.svg",
      alt: "graph icon",
      text: "Profit (RM) in this month",
      total: dashboardData?.overall_profit,
      month: dashboardData?.month_profit,
    },
    {
      src: "/Svg/006-profit-1.svg",
      alt: "profit icon",
      text: "Net Profit (RM) in this month",
      total: dashboardData?.overall_net_profit,
      month: dashboardData?.month_net_profit,
    }
  ];

  const totalData = [
    {
      src: "/Svg/XMLID_1441_.svg",
      alt: "profit icon",
      text: "Total Balance In Main Wallet (RM)",
      value: dashboardData?.total_wallet.main_wallet_amount,
    },
    {
      src: "/Svg/Group 8557.svg",
      alt: "profit icon",
      text: "Total Amount of Today's Referral Earning (RM)",
      value: dashboardData?.total_wallet.todays_referral_earning_wallet_amount,
    },
    {
      src: "/Svg/Group 8563.svg",
      alt: "profit icon",
      text: "Total Amount of Donations (RM)",
      value: dashboardData?.total_donate,
    }
  ];


  return {
    totalData,
    totalCardData,
    totalAndMonthData,
    totalAndMonthData2,
    totalMonthDataAndTotalMonthCount,
    totalInactiveAccountsData
  };
};

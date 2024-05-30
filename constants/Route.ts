import AppsIcon from "@mui/icons-material/Apps";

export const ROUTES = [
  {
    name: "Dashboard",
    icon: "",
    links: [
      {
        name: "Overview",
        url: "/dashboard/overview",
        apiIdentifier: "DASHBOARD_OVERVIEW",
      },
      {
        name: "Analytics",
        url: "/dashboard/analytics",
        apiIdentifier: "DASHBOARD_ANALYTICS",
      },
    ],
  },
  // {
  //   name: "User Management",
  //   icon: "/Svg/004-group.svg",
  //   links: [
  //     {
  //       name: "User List",
  //       url: "/user-management/user-list",
  //       apiIdentifier: "USER_MANAGEMENT_USER_LIST",
  //     },
  //     {
  //       name: "Activation Request",
  //       url: "/user-management/activation-request",
  //       apiIdentifier: "USER_MANAGEMENT_ACTIVATION_REQUEST",
  //     },
  //     {
  //       name: "Inactive Users",
  //       url: "/user-management/inactive-users",
  //       apiIdentifier: "USER_MANAGEMENT_INACTIVE_USERS",
  //     },
  //     {
  //       name: "Blocked Users",
  //       url: "/user-management/blocked-users",
  //       apiIdentifier: "USER_MANAGEMENT_BLOCKED_USERS",
  //     },
  //   ],
  // },
  // {
  //   name: "Reports",
  //   icon: "/Svg/001-copy.svg",
  //   links: [
  //     {
  //       name: "All Transactions",
  //       url: "/reports/all-transactions",
  //       apiIdentifier: "REPORTS_ALL_TRANSACTIONS",
  //     },
  //     {
  //       name: "Monthly Report",
  //       url: "/reports/monthly-report",
  //       apiIdentifier: "REPORTS_MONTHLY",
  //     },
  //     {
  //       name: "Sales Report",
  //       url: "/reports/sales-report",
  //       apiIdentifier: "REPORTS_SALES_REPORT",
  //     },
  //     // {
  //     //   name: "Sales Summary",
  //     //   url: "/reports/sales-summary",
  //     //   apiIdentifier: "REPORTS_SALES_SUMMARY",
  //     // },
  //     {
  //       name: "Product Summary",
  //       url: "/reports/product-summary",
  //       apiIdentifier: "REPORTS_PRODUCT_SUMMARY",
  //     },
  //     // {
  //     //   name: "Product Outstanding",
  //     //   url: "/reports/product-outstanding",
  //     //   apiIdentifier: "REPORTS_PRODUCT_OUTSTANDING",
  //     // },
  //     {
  //       name: "Main Wallet",
  //       url: "/reports/main-wallet",
  //       apiIdentifier: "REPORTS_MAIN_WALLET",
  //     },
  //     {
  //       name: "Earning Wallet",
  //       url: "/reports/earning-wallet",
  //       apiIdentifier: "REPORTS_EARNING_WALLET",
  //     },
  //     {
  //       name: "Donations",
  //       url: "/reports/donations",
  //       apiIdentifier: "REPORTS_DONATIONS",
  //     },
  //     // {
  //     //   name: "Expenses",
  //     //   url: "/reports/expenses",
  //     //   apiIdentifier: "REPORTS_EXPENSES",
  //     // },
  //   ],
  // },
  // {
  //   name: "API",
  //   icon: "/Svg/002-list.svg",
  //   links: [
  //     {
  //       name: "IMPACCT",
  //       url: "/apii/iimmpact",
  //       apiIdentifier: "API_IIMMPACT",
  //     },
  //     {
  //       name: "BillPlz",
  //       url: "/apii/billplz",
  //       apiIdentifier: "API_BILLPLZ",
  //     },
  //     {
  //       name: "ChipIN",
  //       url: "/apii/chipin",
  //       apiIdentifier: "API_CHIPIN",
  //     },
  //   ],
  // },
  {
    name: "Users",
    icon: "",
    svg: AppsIcon,
    links: [
      {
        name: "BEB Members",
        url: "/home-page/environment-variables",
        apiIdentifier: "API_IIMMPACT",
      },
      {
        name: "Companies",
        url: "/home-page/environment-variables",
        apiIdentifier: "API_IIMMPACT",
      }
    ],
  },
  {
    name: "Projects/Products",
    icon: "",
    links: [
      // {
      //   name: "Manager",
      //   url: "/third-party/manager",
      //   apiIdentifier: "API_IIMMPACT",
      // },
      // {
      //   name: "Services",
      //   url: "/third-party/services",
      //   apiIdentifier: "API_IIMMPACT",
      // },
    
    ],
  },
  {
  name: "Bookings",
  icon: "",
  links: [
    // {
    //   name: "Manager",
    //   url: "/third-party/manager",
    //   apiIdentifier: "API_IIMMPACT",
    // },
    // {
    //   name: "Services",
    //   url: "/third-party/services",
    //   apiIdentifier: "API_IIMMPACT",
    // },
  
  ],
},
{
  name: "Leads",
  icon: "",
  links: [
    
  
  ],
},
  {
    name: "Content",
    icon: "",
    links: [
      {
        name: "Promotions",
        url: "/content/promotions",
        apiIdentifier: "API_IIMMPACT",
      },
      {
        name: "Extra Guide",
        url: "/content/extra-guide",
        apiIdentifier: "API_IIMMPACT",
      },
    ],
  },
  {
    name: "Finance",
    icon: "",
    links: [
      {
        name: "Wallets",
        url: "/bank-details/fpx-banks",
        apiIdentifier: "API_IIMMPACT",
      },
      {
        name: "Payouts",
        url: "/bank-details/fpx-banks",
        apiIdentifier: "API_IIMMPACT",
      },
      {
        name: "Reports",
        url: "/bank-details/fpx-banks",
        apiIdentifier: "API_IIMMPACT",
      },
    ],
  },
  {
    name: "Contests",
    icon: "",
    links: [
      
    
    ],
  },
  {
    name: "Notifications",
    icon: "",
    links: [
      
    
    ],
  },
  {
    name: "Report & Analytics",
    icon: "",
    links: [
      
    
    ],
  },
  {
    name: "Security",
    icon: "",
    links: [
      
    
    ],
  },
  {
    name: "Settings",
    icon: "",
    links: [
      {
        name: "Integrations",
        url: "/settings/admin-files",
        apiIdentifier: "API_IIMMPACT",
      },
      {
        name: "Terms & Conditions",
        url: "/settings/terms-conditions",
        apiIdentifier: "API_IIMMPACT",
      },
      {
        name: "Privacy Policy",
        url: "/settings/privacy-policy",
        apiIdentifier: "API_IIMMPACT",
      },
      {
        name: "Help Center",
        url: "/settings/help-center",
        apiIdentifier: "API_IIMMPACT",
      },
      
      
    ],
  },
];

export const REASON_TRANSACTIONS = [
  {
    name: "All Reason Transactions",
    url: "/reports/all-reason-transactions",
    apiIdentifier: "REPORTS_ALL_REASON_TRANSACTIONS"
  }
]


//nested routes
export const USER_ROUTES = [
  {
    url: "/user-management/user-list/user-profile",
    data: [
      {
        name: "User Management",
      },
      {
        name: "User List",
        url: "/user-management/user-list",
      },
      {
        name: "User Profile",
        url: "/user-management/user-list/user-profile",
      },
    ],
  },
  {
    url: "/user-management/user-list/user-profile/referrals",
    data: [
      {
        name: "User Management",
      },
      {
        name: "User List",
        url: "/user-management/user-list",
      },
      {
        name: "User Profile",
        url: "/user-management/user-list/user-profile",
      },
      {
        name: "Referrals",
        url: "/user-management/user-list/user-profile/referrals",
      },
    ],
  },
];

export const API_ROUTES = [
  {
    url: "/apii/iimmpact/view-details",
    data: [
      {
        name: "API",
      },
      {
        name: "IIMMPACT",
        url: "/apii/iimmpact",
      },
      {
        name: "View Details",
        url: "/apii/iimmpact/view-details",
      },
    ],
  },
];

export const THIRD_PARTY_ROUTES = [
  {
    url: "/third-party/manager/category",
    data: [
      {
        name: "Third Party",
      },
      {
        name: "Manager",
        url: "/third-party/manager",
      },
      {
        name: "Categories",
        url: "/third-party/manager/category",
      },
    ],
  },
  {
    url: "/third-party/manager/services",
    data: [
      {
        name: "Third Party",
      },
      {
        name: "Manager",
        url: "/third-party/manager",
      },
      {
        name: "Services",
        url: "/third-party/manager/services",
      },
    ],
  },
  {
    url: "/third-party/manager/products",
    data: [
      {
        name: "Third Party",
      },
      {
        name: "Manager",
        url: "/third-party/manager",
      },
      {
        name: "Products",
        url: "/third-party/manager/products",
      },
    ],
  },
  {
    url: "/third-party/product-detail",
    data: [
      {
        name: "Third Party",
      },
      {
        name: "Services",
        url: "/third-party/services",
      },
      {
        name: "Product Detail",
        url: "/third-party/product-detail",
      },
    ],
  },
];

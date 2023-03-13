import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
    // {
    //   title: "Support",
    //   href: "/support",
    //   disabled: true,
    // },
  ],
  sidebarNav: [
    {
      title: "My Contributions",
      href: "/contributions",
      icon: "billing",
    },
    {
      title: "My Signed Letters",
      href: "/signed-letters",
      icon: "post",
    },
    // {
    //   title: "Billing",
    //   href: "/billing",
    //   icon: "billing",
    // },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ],
};

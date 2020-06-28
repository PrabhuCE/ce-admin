import React, { useEffect, useState } from "react";
import { dashboardResults } from "../../MockData/b2b_dashboard_data";

export default function DashboardBTB(props) {
  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {};

  return (
    <div>
      <div>Test Dashboard</div>
    </div>
  );
}

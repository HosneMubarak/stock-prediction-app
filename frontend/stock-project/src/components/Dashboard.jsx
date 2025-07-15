import { useEffect } from "react";
import axiosinstance from "../utils/axiosinstance";

const Dashboard = () => {
  console.log("Dashboard");
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosinstance.get("auth/user/");
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className="flex justify-center p-4">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Wellcome! Dashboard Page</h2>
          <p>We are using cookies for no reason.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

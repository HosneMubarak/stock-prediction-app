import axios from "axios";
import { useEffect, useState } from "react";
import axiosinstance from "../utils/axiosinstance";
import { API_BASE_URL } from "../utils/constants";

const Dashboard = () => {
  const [stock, setStock] = useState("");
  const [ticker, setTicker] = useState("");
  const [basicPlotImage, setBasicPlotImage] = useState("");
  const [hundredMaPlotImage, setHundredMaPlotImage] = useState("");
  const [twoHundredMaPlotImage, setTwoHundredMaPlotImage] = useState("");
  console.log("Dashboard");
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosinstance.get("auth/user/");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleStockPrediction = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_BASE_URL + "stock/prediction/", {
        stock: stock,
      });
      setTicker(res.data.stock);
      setBasicPlotImage(res.data.basic_plot_image.replace(/\\/g, "/"));
      setHundredMaPlotImage(res.data.hundred_ma_plot_image.replace(/\\/g, "/"));
      setTwoHundredMaPlotImage(
        res.data.two_hundred_ma_plot_image.replace(/\\/g, "/")
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="card w-full max-w-md shadow-2xl bg-neutral text-neutral-content">
        <div className="card-body">
          <form className="space-y-4" onSubmit={handleStockPrediction}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">
                  Stock Symbol
                </span>
              </label>
              <input
                type="text"
                placeholder="Stock Symbol e.g: AAPL"
                className="input input-bordered w-full"
                name="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="text-center text-sm mt-2">
              <div className="form-control mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  See Prediction
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Prediction Results */}
      {ticker && (
        <div className="w-full max-w-2xl mt-6 space-y-4">
          <h2 className="text-xl font-bold text-center">
            Results for: {ticker}
          </h2>

          <div className="space-y-2">
            <img
              src={basicPlotImage}
              alt="Basic Plot"
              className="w-full rounded"
            />
            <img
              src={hundredMaPlotImage}
              alt="100 MA Plot"
              className="w-full rounded"
            />
            <img
              src={twoHundredMaPlotImage}
              alt="200 MA Plot"
              className="w-full rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

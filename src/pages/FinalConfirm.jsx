import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FinalConfirm = () => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const getUrlParam = new URLSearchParams(window.location.search);

  const orderId = getUrlParam.get("merchantOrderId");

  const [formData, setFormData] = useState({
    // name: "",
    // email: "",
    transactionScreenshot: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      transactionScreenshot: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    // form.append("name", formData.name);
    form.append("orderId", orderId);
    form.append("transactionScreenshot", formData.transactionScreenshot);

    try {
      const response = await axios.post(
        "https://api.ozzy.today/transactions/transactionImage",
        form
      );

      console.log(response);
      if (response.status === 200) {
        console.log("Data sent successfully");
        nav("/ThankYou");
      } else {
        console.error("Failed to send data to the API");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // for initial post id data

  const postOrderId = async () => {
    try {
      const response = await axios.post(
        "https://api.ozzy.today/transactions/getOdUser",
        {
          orderId: orderId,
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("OrderId sent successfully");
        setUserInfo(response?.data?.result?.data?.customer_id);
      } else {
        console.error("Failed to send the orderId");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(userInfo);

  useEffect(() => {
    postOrderId();
  }, [orderId]);

  return (
    <div className="bg-black flex justify-center">
      <div className="bg-white h-full w-full lg:w-[60%] p-5 sm:p-10 flex flex-col gap-5 items-center">
        <h2 className="text-2xl sm:text-4xl font-bold">Confirmation</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full sm:gap-5"
        >
          <div className="flex flex-col gap-5 text-xl font-bold">
            <h1 >Name : <span className="text-base font-medium">{userInfo?.bank_acc_name}</span></h1>
            <h1>Phone : <span className="text-base font-medium">{userInfo?.phone_number}</span></h1>
            <h1>Email : <span className="text-base font-medium">{userInfo?.user_email}</span></h1>
          </div>

          <div className="flex flex-col gap-2 ">
            <label className="text-xl font-bold">Transaction Screenshot:</label>
            <input
              className="inputForm bg-slate-200"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
              required
            />
          </div>

          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 sm:p-4 sm:text-lg p-3 rounded-md text-white font-bold"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinalConfirm;

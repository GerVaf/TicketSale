import React from "react";
import { useSelector } from "react-redux";

const PayWithDinger = () => {
  const data = useSelector((store) => store?.data?.data);
  console.log(data);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded p-5 flex flex-col gap-5 w-[500px]">
        <div className="flex items-center gap-3">
          <h1>Name :</h1>
          <p>{data?.accname}</p>
        </div>
        <div className="flex items-center gap-3">
          <h1>Phone :</h1>
          <p>{data?.phone}</p>
        </div>
        <div className="flex items-center gap-3">
          <h1>Email :</h1>
          <p>{data?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <h1>Quantity :</h1>
          <p>{data?.tick_quantity}</p>
        </div>
        <div className="flex items-center gap-3">
          <h1>Total_price :</h1>
          <p>{data?.total_price}</p>
        </div>
        <button className="bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 from-blue-500 to-blue-700 rounded-md py-3 text-white font-bold">
          Pay With Dinger
        </button>
      </div>
    </div>
  );
};

export default PayWithDinger;

import React from "react";
import kbzpay from "../assets/kbzpay.webp";
import kpayQr from "../assets/kpayQr.png";
import apayQr from "../assets/apayQr.jpg";
import ayabank from "../assets/ayabank.png";
import ayapay from "../assets/ayapay.png";
const Payments = () => {
  return (
    <div className="grid grid-cols-12 gap-5 w-full md:w-[50%] lg:w-[35%] mx-auto my-5">
      <div className="col-span-12 lg:col-span-12 p-5 bg-slate-100 rounded flex flex-col gap-3 items-center">
        {/* Image */}
        <img src={ayabank} alt="" className="h-[100px] aspect-auto" />

        {/* Header */}
        <h1>AYA Account</h1>
        <p>20009182392</p>
      </div>
      <div className="col-span-12 lg:col-span-12 p-5 bg-slate-100 rounded flex justify-around gap-5 items-center">
        <div className="text-center">
          {/* Image */}
          <img src={ayapay} alt="" className="h-[100px] aspect-auto" />
          {/* Header */}

          <p>09788343932</p>
        </div>
        <div>
          <img src={apayQr} alt="" className="w-48 h-48" />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-12 p-5 bg-slate-100 rounded flex justify-around gap-3 items-center">
        <div className="text-center">
          {/* Image */}
          <img src={kbzpay} alt="" className="h-[100px] aspect-auto" />
          {/* Header */}
          <h1>KBZ pay</h1>
          <p>09788343932</p>
        </div>
        <div>
          <img src={kpayQr} alt="" className="w-48 h-48" />
        </div>
      </div>
    </div>
  );
};

export default Payments;

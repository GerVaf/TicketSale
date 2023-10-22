import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
const Detail = () => {
  const [qty, setQty] = useState(0);

  const handleAddAndMinus = (e) => {
    if (e.target.innerText === "-") {
      if (qty > 0) setQty((prev) => (prev = prev - 1));
    } else {
      setQty((prev) => (prev = prev + 1));
    }
  };
  return (
    <div className="flex flex-col gap-5">
      {/* Navbar */}
      <div className="p-8 bg-slate-600 text-white flex justify-between items-center">
        <h1>Home</h1>
        <h1>Detail</h1>
      </div>
      <div className="w-[80%] mx-auto">
        {/* Hero Image */}
        <div className="h-[80vh] bg-slate-600 mb-5">
          <img
            className="h-full w-full"
            src={
              "https://images.unsplash.com/photo-1696595883516-76c97aa3a164?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </div>
        {/* Detail information */}
        <div className="p-5 rounded flex flex-col gap-5 text-white bg-slate-600">
          {/* Header */}
          <h1 className="text-xl font-bold">Detail</h1>
          {/* Detail Part */}
          <div className="flex items-center gap-5">
            {/* image */}
            <div className="w-[300px]">
              <img
                src="https://images.unsplash.com/photo-1696595883516-76c97aa3a164?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            {/* Title, Address, Date */}
            <div className="flex flex-col gap-10">
              {/* Title */}
              <h1 className="text-xl font-bold">Event Title</h1>
              {/* Address and Date */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <FaLocationDot className="text-xl" />
                  <p>at Mana Wynwood 2217 NW 5 Ave, Miami, FL 33127</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaRegCalendarAlt className="text-xl" />
                  <p>Saturday, October 21, 2023 Show at 3:00PM</p>
                </div>
              </div>
            </div>
          </div>
          {/* Ticket Price */}
          <div className="bg-white text-black rounded p-5 flex justify-between">
            {/* Ticket Name */}
            <h1 className="font-bold text-2xl">Ticket Name</h1>
            <div className="flex flex-col gap-3">
              <p>9,500 MMK</p>
              <div className="flex">
                <button
                  onClick={(e) => handleAddAndMinus(e)}
                  className="addMinusBtn"
                >
                  -
                </button>
                <p className="px-3 py-1">{qty}</p>
                <button
                  onClick={(e) => handleAddAndMinus(e)}
                  className="addMinusBtn"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <button className="self-end px-6 py-3 font-bold text-lg rounded-lg bg-gradient-to-r from-violet-700 to-purple-600 text-white">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;

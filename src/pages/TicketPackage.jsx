import React from "react";
import img1 from "../assets/halloween ritual_table packages_1.jpg";
import img2 from "../assets/halloween ritual_table packages_2.jpg";
import img3 from "../assets/halloween ritual_table packages_3.jpg";
import img4 from "../assets/halloween ritual_table packages_cv.jpg";
const TicketPackage = () => {
  return <div className="flex flex-col gap-3">
    <img src={img4} alt="" />
    <img src={img1} alt="" />
    <img src={img2} alt="" />
    <img src={img3} alt="" />
  </div>;
};

export default TicketPackage;

import {
  BsFacebook,
  BsFillArrowDownCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import poster from "../assets/poster.jpg";
import bgCard2 from "../assets/bgCard2.png";
import bgCardGA from "../assets/bgCardGA.png";
import tablePlan from "../assets/tablePlan.svg";
import kbzpay from "../assets/kbzpay.webp";
import kpayQr from "../assets/kpayQr.png";
import apayQr from "../assets/apayQr.jpg";
import ayabank from "../assets/ayabank.png";
import ayapay from "../assets/ayapay.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { detail } from "../Global/TicketSlice";
import img1 from "../assets/halloween ritual_table packages_1.jpg";
import img2 from "../assets/halloween ritual_table packages_2.jpg";
import img3 from "../assets/halloween ritual_table packages_3.jpg";
import img4 from "../assets/halloween ritual_table packages_cv.jpg";
import img5 from "../assets/gaTicket.png";
const Home = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [sectionStates, setSectionStates] = useState({
    packages: false,
    tickets: false,
    tablePlan: false,
  });

  const toggleImages = (section) => {
    setSectionStates((prevStates) => ({
      ...prevStates,
      [section]: !prevStates[section],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.ozzy.today/tickets");
        console.log(response);
        setData(response?.data?.result?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      {/* Hero Image */}
      <div className="aspect-auto">
        <img className="h-full w-full" src={poster} />
      </div>

      {/* Packages Section */}
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-5xl md:text-8xl text-red-800 text-center">
          Packages
        </h1>
        <button
          className="w-full px-5 py-2 bg-red-700 text-white font-bold text-lg flex items-center justify-center gap-3"
          onClick={() => toggleImages("packages")}
        >
          Click Here To See <BsFillArrowDownCircleFill />
        </button>
        {/* Packages */}
        <div
          className={`flex flex-col gap-5 w-full lg:w-[60%] mx-auto scrollbar-none overflow-y-scroll transition-all duration-500 ${
            sectionStates.packages ? "h-screen" : "h-0"
          }`}
        >
          {/* images */}
          <img src={img5} alt="" className="" />
          <img src={img4} alt="" className="" />
          <img src={img1} alt="" className="" />
          <img src={img2} alt="" className="" />
          <img src={img3} alt="" className="" />
        </div>
      </div>

      {/* Ticket Section */}
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-5xl md:text-8xl text-red-800 text-center">
          Tickets
        </h1>
        <button
          className="w-full px-5 py-2 bg-red-700 text-white font-bold text-lg flex items-center justify-center gap-3"
          onClick={() => toggleImages("tickets")}
        >
          Click Here To See <BsFillArrowDownCircleFill />
        </button>
        <div
          className={`flex flex-wrap rounded mx-1 overflow-y-scroll scrollbar-none transition-all duration-500 ${
            sectionStates.tickets ? "h-screen" : "h-0"
          }`}
        >
          {/* Card */}
          {data?.map((el) => {
            return (
              <div
                key={el?._id}
                className="rounded overflow-hidden lg:w-2/6 p-5"
              >
                {/* Image */}

                <img
                  src={el?.ticket_name === "GA" ? bgCardGA : bgCard2}
                  alt=""
                  className="object-cover"
                />
                <div
                  className={`flex justify-between items-center p-2 text-white bg-gradient-to-r from-white/10 via-black to-white/10`}
                >
                  <h1
                    className={`text-3xl font-bold
                  ${el?.ticket_name === "GA" && "ga"}
                ${el?.ticket_name === "VIP_Y" && "vip"}
                ${el?.ticket_name === "VIP_B" && "vip"}
                ${el?.ticket_name === "VVIP" && "vvip"} ${
                      el?.ticket_name === "VVIP_S1" && "vvip"
                    } ${el?.ticket_name === "VVIP_S2" && "vvip"}`}
                  >
                    {el?.ticket_name === "GA" && "GA"}

                    {el?.ticket_name === "VIP_Y" && "VIP"}
                    {el?.ticket_name === "VIP_B" && "S-VIP"}
                    {el?.ticket_name === "VVIP" && "VVIP"}
                    {el?.ticket_name === "VVIP_S1" && <span>S-VVIP GOLD</span>}
                    {el?.ticket_name === "VVIP_S2" && (
                      <span>S-VVIP DIAMOND</span>
                    )}
                  </h1>
                  <div>
                    {el?.ticket_name == "GA" ? (
                      ""
                    ) : (
                      <p className="text-xs text-end">
                        For {el?.ticket_name === "VIP_Y" && "6 Person"}{" "}
                        {el?.ticket_name === "VIP_B" && "6 Person"}{" "}
                        {el?.ticket_name === "VVIP" && "7 Person"}{" "}
                        {el?.ticket_name === "VVIP_S1" && "9 Person"}{" "}
                        {el?.ticket_name === "VVIP_S2" && "9 Person"}
                      </p>
                    )}

                    <p className="price font-bold">
                      {el?.price?.toLocaleString()} MMK
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floor Plan */}
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-5xl md:text-8xl text-red-800 text-center">
          Floor Plan
        </h1>
        <button
          className="w-full px-5 py-2 bg-red-700 text-white font-bold text-lg flex items-center justify-center gap-3"
          onClick={() => toggleImages("tablePlan")}
        >
          Click Here To See <BsFillArrowDownCircleFill />
        </button>
        <div
          className={`px-3 scrollbar-none overflow-y-scroll transition-all duration-500 flex justify-center items-center ${
            sectionStates.tablePlan ? "h-[300px] lg:h-screen" : "h-0"
          }`}
        >
          <div className="w-full lg:w-[75%] border border-orange-500">
            <img className="w-full h-full" src={tablePlan} />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="font-bold text-5xl md:text-8xl text-red-800 text-center">
          Payments
        </h1>
        <button
          className="w-full px-5 py-2 bg-red-700 text-white font-bold text-lg flex items-center justify-center gap-3"
          onClick={() => toggleImages("payments")}
        >
          Click Here To See <BsFillArrowDownCircleFill />
        </button>
        <div
          className={`rounded mx-1 overflow-y-scroll scrollbar-none transition-all duration-500 ${
            sectionStates.payments ? "h-[750px] lg:h-[350px]" : "h-0"
          }`}
        >
          <div className="grid grid-cols-12 gap-5 w-full px-3">
            <div className="col-span-12 lg:col-span-4 p-5 bg-slate-100 rounded flex flex-col gap-3 items-center">
              {/* Image */}
              <img src={ayabank} alt="" className="h-[100px] aspect-auto" />
              {/* Header */}
              <h1>AYA Account</h1>
              <p>20009182392</p>
            </div>
            <div className="col-span-12 lg:col-span-4 p-5 bg-slate-100 rounded flex justify-around gap-5 items-center">
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
            <div className="col-span-12 lg:col-span-4 p-5 bg-slate-100 rounded flex justify-around gap-3 items-center">
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
        </div>
      </div>

      {/* Confirmation */}
      <div className="flex flex-col items-center gap-5">
        <button
          className="px-8 py-5 rounded bg-red-700 text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-red-900"
          onClick={() => nav("/buy-ticket")}
        >
          Click Here To Buy Tickets <BsFillArrowRightCircleFill />
        </button>
      </div>

      {/* notice and instruction */}
      <div className="p-5 flex flex-col lg:flex-row gap-5">
        <div className="bg-black text-white w-full lg:w-1/2 p-5 rounded">
          <h1 className="font-bold text-xl mb-3">INSTRUCTIONS</h1>
          <div className="flex flex-col gap-3">
            <span>- Check & Choose the package you want to purchase.</span>
            <span>- Calculate the total amount of your desired purchase.</span>
            <span>
              - Check & Choose the payment method you would like to proceed.
            </span>
            <span>
              - Put your choice package in the ‘Notes’ / ‘Remarks’ Section.
            </span>
            <span>
              - TAKE A SCREENSHOT OF THE RECEIPT. SEND the screenshot to{" "}
              <span className="font-bold">Ozzy's facebook messenger</span> &
              Continue To Confirm Your Purchase Again On The Website’s
              CONFIRMATION PAGE.
            </span>
            <span>
              - Enter the “Purchase Information” Section & Wait for an email to
              receive your purchase. Within the mail, you’ll receive the
              E-Ticket & packages you’ve purchased.
            </span>
          </div>
          <h1 className="font-bold my-3 text-slate-300">NOTICE</h1>
          <p className="text-sm text-slate-300">
            If you don't receive the email we’ve sent within the next 24HRs,
            Please contact us via our social media & our automated bot will
            connect you with the support team right away.
          </p>
        </div>
        <div className="bg-black text-white w-full lg:w-1/2 p-5 rounded">
          <h1 className="font-bold text-xl mb-5">လမ်းညွှန်ချက်များ</h1>
          <div className="flex flex-col gap-3">
            <span>- ဝယ်ယူလိုသောပက်ကေ့ခ်ျကို စစ်ဆေးပြီး ရွေးချယ်ပါ။</span>
            <span>
              - ဝယ်ယူလိုသော လက်မှတ်ပမာဏနှင့် ကျသင့်ငွေစုစုပေါင်းပမာဏကို
              တွက်ချက်စစ်ဆေးပါ။
            </span>
            <span>
              - အသုံးပြုလိုသော ငွေပေးချေမှုနည်းလမ်းကို စစ်ဆေးရွေးချယ်ပါ။
            </span>
            <span>
              - 'မှတ်စုများ' / 'မှတ်ချက်များ' ကဏ္ဍတွင် သင်၏ရွေးချယ်ထားသော
              ပက်ကေ့ခ်ျအမျိုးအစားကို ထည့်ပါ။
            </span>
            <span>
              - ငွေလက်ခံပြေစာ၏ မျက်နှာပြင်(screenshot)ကို ယူပြီး Ozzy's Facebook
              messenger တွင် ပို့ပေးပါရန်။ ဝဘ်ဆိုဒ်၏ အတည်ပြုချက်စာမျက်နှာတွင်
              ဝယ်ယူမှုကို ထပ်မံအတည်ပြုရန် ဆက်လက်လုပ်ဆောင်ပါ။
            </span>
            <span>
              - "ဝယ်ယူမှုအချက်အလက်" အပိုင်းကို ထည့်သွင်းပြီး သင့်ဝယ်ယူမှုကို
              လက်ခံရရှိရန် အီးမေးလ်ကို စောင့်ပါ။ မေးလ်အတွင်းတွင် သင်ဝယ်ယူထားသည့်
              E-Ticket နှင့် ပက်ကေ့ဂျ်များကို လက်ခံရရှိပါမည်။
            </span>
          </div>
          <h1 className="font-bold text-slate-300 my-3">သတိပြုရန်</h1>
          <p className="text-sm text-slate-300">
            ၂၄နာရီအတွင်း emailမှတဆင့် E-Ticket မရရှိပါက Facebook Page
            Messengerမှ အကြောင်းကြားပေးပါ။ ကျွန်ုပ်တို့၏ support teamမှ
            ပြန်လည်ဆက်သွယ်ပေးမည်ဖြစ်ပါတယ်ခင်ဗျာ။
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-white/10 via-red-600 to-white/10 p-5 flex flex-col md:flex-row gap-5 justify-between items-center">
        <div className="flex items-center gap-5">
          {/* Social Icons */}
          <a
            href="https://www.facebook.com/profile.php?id=61552327747812"
            className="text-white flex items-center gap-5 text-3xl"
          >
            <BsFacebook />
          </a>
          <div className="text-white flex gap-3">
            <span className="text-lg">Support Team သို့ ဆက်သွယ်ရန်။</span>
            <span className="text-lg">09757618645, 09971282256</span>
          </div>
        </div>
        {/* Privacy Policy */}

        <p className="text-center md:text-start text-slate-300">
          ©2023 - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Home;

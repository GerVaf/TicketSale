import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const FormSubmit = ({ refresh, setRefresh }) => {
  // Get Ticket Detail
  const detail = useSelector((store) => store?.ticket?.ticketDetail);
  // console.log(detail);
  const [qty, setQty] = useState(1);
  const [extraPerson, setExtraPerson] = useState(0);
  const [total, setTotal] = useState(0);
  const nav = useNavigate();
  const [errorMessages, setErrorMessages] = useState();

  const [formData, setFormData] = useState({
    accname: "",
    phone: "",
    email: "",
    payment_type: "",
    transactionid: "",
    ticketid: detail?._id,
    plus_person: null,
    tick_quantity: null,
    total_price: null,
  });

  // Calculate the total price whenever qty or extraPerson changes
  useEffect(() => {
    const pricePerTicket = detail?.price; // Change this to the actual price per ticket
    let totalPrice = qty * pricePerTicket + extraPerson * detail?.extra_price;

    setTotal(totalPrice);
    setFormData({
      ...formData,
      tick_quantity: qty,
      plus_person: extraPerson,
      total_price: totalPrice,
    });
  }, [qty, extraPerson]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "qty") {
      // Handle quantity change
      setQty(newValue);
    } else if (name === "extraPerson") {
      // Handle extraPerson change
      setExtraPerson(newValue);
    } else {
      setFormData({ ...formData, [name]: newValue });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.ozzy.today/user",
        formData
      );
      console.log(response);

      if (response?.data?.result?.msg === "Successful") {
        setRefresh(!refresh);

        nav("/");

        toast.success("Success");
      }
      if (response?.data?.status === 400) {
        setErrorMessages(response?.data?.err);
      }
    } catch (error) {
      console.error(error);
    }
    // console.log(formData);
  };

  return (
    <div className="flex items-center justify-center bg-black">
      <div className="flex flex-col lg:w-[900px] gap-5">
        {/* top form side  */}
        <div className="bg-slate-50 p-5 rounded-md">
          <form className="flex flex-col gap-5">
            {/* Personal info  */}
            <div className="flex flex-col gap-5">
              <label
                className="text-3xl font-bold self-end"
                htmlFor="personal_info"
              >
                Purchased Information
              </label>
              {errorMessages && (
                <div className="error-messages">
                  <h2>Error Messages:</h2>
                  <ul>
                    {Object.keys(errorMessages).map((fieldName) => (
                      <li key={fieldName}>
                        {fieldName}: {errorMessages[fieldName]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* name, phone number, and KBZ pay transition ID */}
              <input
                required
                placeholder="Your name"
                type="text"
                className="inputForm"
                id="name"
                name="accname"
                value={formData.accname}
                onChange={handleChange}
              />
              <input
                required
                placeholder="Your phone number"
                className="inputForm"
                type="tel"
                id="phoneNumber"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                required
                placeholder="Transaction number"
                className="inputForm"
                type="text"
                id="transactionid"
                name="transactionid"
                value={formData.transactionid}
                onChange={handleChange}
              />
              <input
                required
                placeholder="Your email"
                className="inputForm"
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {/* Quantity */}
              <div className="cursor-pointer flex justify-between border-white bg-gradient-to-r from-zinc-600 to-zinc-500 items-center p-5 rounded-md text-white">
                <p>Quantity : </p>
                <div className="flex items-center gap-2 text-xl bg-white justify-center text-black rounded-md overflow-hidden">
                  {detail?.ticket_name === "GA" ? (
                    <>
                      <p
                        className="w-10 h-10 flex justify-center items-center"
                        onClick={() => (qty > 1 ? setQty(qty - 1) : "")}
                      >
                        -
                      </p>
                      <p className="w-10 h-10 flex justify-center items-center">
                        {qty}
                      </p>
                      <p
                        className="w-10 h-10 flex justify-center items-center"
                        onClick={() => {
                          qty < 5 && setQty(qty + 1);
                        }}
                      >
                        +
                      </p>
                    </>
                  ) : (
                    <p className="w-[136px] h-[40px] flex justify-center items-center">
                      {qty}
                    </p>
                  )}
                </div>
              </div>
              {/* Extra person */}

              <div className="cursor-pointer flex justify-between border-white bg-gradient-to-r from-zinc-600 to-zinc-500 items-center p-5 rounded-md text-white">
                <p>Extra person : </p>
                <div className="flex items-center gap-2 text-xl bg-white justify-center text-black rounded-md overflow-hidden">
                  <p
                    className="w-10 h-10 flex justify-center items-center"
                    onClick={() =>
                      extraPerson > 0 ? setExtraPerson(extraPerson - 1) : ""
                    }
                  >
                    -
                  </p>
                  <p className="w-10 h-10 flex justify-center items-center">
                    {extraPerson}
                  </p>
                  <p
                    className="w-10 h-10 flex justify-center items-center"
                    onClick={() => {
                      detail?.extra_person > extraPerson &&
                        setExtraPerson(extraPerson + 1);
                    }}
                  >
                    +
                  </p>
                </div>
              </div>
            </div>

            {/* Payment _type */}
            <div className="flex flex-col gap-5">
              <label
                className="text-xl font-bold text-end"
                htmlFor="payment_type"
              >
                Payment Information
              </label>
              <div className="flex rounded-md gap-10 w-full">
                <div>
                  <input
                    type="radio"
                    className="outline-none p-5 mr-2"
                    id="payment_type_ayapay"
                    name="payment_type"
                    value="ayapay"
                    checked={formData.payment_type === "ayapay"}
                    onChange={handleChange}
                  />
                  <label htmlFor="payment_type_ayapay">AYA Pay</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="outline-none p-5 mr-2"
                    id="payment_type_ayaaccount"
                    name="payment_type"
                    value="ayaaccount"
                    checked={formData.payment_type === "ayaaccount"}
                    onChange={handleChange}
                  />
                  <label htmlFor="payment_type_ayaaccount">AYA account</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className=" outline-none p-5 mr-2"
                    id="payment_type_kbzpay"
                    name="payment_type"
                    value="kbzpay"
                    checked={formData.payment_type === "kbzpay"}
                    onChange={handleChange}
                  />
                  <label htmlFor="payment_type_kbzpay">KBZ Pay</label>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex gap-5">
              <input
                required
                className="w-5 h-5"
                type="checkbox"
                id="termsAndConditionsCheckbox"
                name="termsAndConditions"
                // checked={formData.termsAndConditions}
                // onChange={handleChange}
              />
              <label htmlFor="termsAndConditionsCheckbox">
                <div>
                  I agree to the{" "}
                  <a className="text-blue-600" href="#">
                    terms and conditions.
                  </a>
                </div>
              </label>
            </div>

            <button
              className="bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 from-blue-500 to-blue-700 rounded-md py-3 text-white font-bold"
              type="submit"
            >
              Confirm
            </button>
          </form>
        </div>
        {/* bottom side  */}
        <div className="p-5 flex flex-col rounded-md ">
          <div className="text-black bg-gradient-to-r from-zinc-200 to-zinc-300 rounded-md">
            <div className="text-3xl py-5 flex flex-col lg:flex-row justify-between px-5 border-b-2">
              <p>
                {detail?.ticket_name === "GA" && "GA"}

                {detail?.ticket_name === "VIP_Y" && "VIP"}
                {detail?.ticket_name === "VIP_B" && "S-VIP"}
                {detail?.ticket_name === "VVIP" && "VVIP"}
                {detail?.ticket_name === "VVIP_S1" && (
                  <span>S-VVIP PACKAGE GOLD</span>
                )}
                {detail?.ticket_name === "VVIP_S2" && (
                  <span>S-VVIP PACKAGE DIAMOND</span>
                )}
              </p>
              <p>{detail?.price?.toLocaleString()} MMK</p>
            </div>
            {/* price  */}
            <div className="flex justify-between p-5">
              <div className="text-xl flex flex-col gap-5 ">
                <p>Quantity : </p>
                <p>Extra Person: </p>
                <p>Total Price: </p>
              </div>
              <div className="text-xl flex flex-col gap-5 ">
                <p>{formData?.tick_quantity} ticket</p>
                <p>{formData?.plus_person} person</p>
                <p>{formData?.total_price?.toLocaleString()} MMK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubmit;

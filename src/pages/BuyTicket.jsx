import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detail } from "../Global/TicketSlice";
import { useNavigate } from "react-router-dom";

const BuyTicket = () => {
  const [ticketsData, setTicketsData] = useState([]);
  const [qty, setQty] = useState(1);
  const [extraPerson, setExtraPerson] = useState(0);
  const [errorMessages, setErrorMessages] = useState();

  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.ticket?.ticketDetail);

  // console.log(data);

  const nav = useNavigate();

  // Personal, Purcahse Information form_data
  const [formData, setFormData] = useState({
    accname: "",
    email: "",
    ticketid: "",
    phone: "",
    package: null,
    tick_quantity: null,
    plus_person: null,
    total_price: null,
  });

  console.log(formData);

  // Collect Input value
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "qty") {
      // Handle quantity change
      setQty(newValue);
    } else if (name === "extraPerson") {
      // Handle extraPerson change
      setExtraPerson(newValue);
    } else if (name === "package") {
      // Handle radio button selection
      setFormData({ ...formData, [name]: parseInt(newValue) });
    } else {
      setFormData({ ...formData, [name]: newValue });
    }
  };

  // console.log(data);

  // Calculate the total price whenever qty or extraPerson changes
  useEffect(() => {
    const pricePerTicket = data?.price; // Change this to the actual price per ticket
    let totalPrice = qty * pricePerTicket + extraPerson * data?.extra_price;
    console.log(totalPrice);
    setTotal(totalPrice);
    setFormData({
      ...formData,
      tick_quantity: qty,
      plus_person: extraPerson,
      total_price: totalPrice,
    });
  }, [qty, extraPerson]);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get("https://test.api.ozzy.today/tickets");
        console.log(response);
        setTicketsData(response?.data?.result?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicketData();
  }, []);

  const dataSubmit = async () => {
    console.log(formData);

    try {
      const response = await axios.post(
        "https://test.api.ozzy.today/user",
        formData
      );
      console.log(response);

      if (response.status === 200) {
        // Handle a successful API response here
        console.log("Data sent successfully");
        if (response?.data?.result?.data) {
          location.href = response?.data?.result?.data;
          // nav("/success");
        }
      } else {
        // Handle API errors here
        console.error("Failed to send data to the API");
      }
      if (response?.data?.status === 400) {
        setErrorMessages(response?.data?.err);
      }
    } catch (error) {
      // Handle network errors and other exceptions here
      console.error("Error:", error);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="flex flex-col gap-5 bg-white w-full sm:w-[70%] p-5 sm:p-10">
        {/* Personal Information */}
        <h1 className="text-lg sm:text-4xl font-bold">Personal Information</h1>
        {errorMessages && (
          <div className="error-messages">
            <h2 className="font-bold text-red-500">Error Messages:</h2>
            <ul>
              {Object.keys(errorMessages).map((fieldName) => (
                <li key={fieldName} className="text-red-500">
                  {fieldName}: {errorMessages[fieldName]}
                </li>
              ))}
            </ul>
          </div>
        )}
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
          placeholder="Your email"
          className="inputForm"
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          required
          placeholder="Your phone"
          className="inputForm"
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <h1 className="text-lg sm:text-4xl font-bold">Purchase Information</h1>
        {/* Ticket Type */}
        <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
          <h1 className="text-lg font-bold">Choose Ticket</h1>
          <div className="flex items-center flex-wrap gap-3">
            {ticketsData?.map((ticket) => {
              return (
                <div
                  onClick={() => {
                    setFormData({
                      ...formData,
                      ticketid: ticket._id, // Set the selected ticket name
                      total_price: ticket.price, // Set the price for the selected ticket
                    });
                    dispatch(detail(ticket));
                    setQty(1);

                    setExtraPerson(0);
                    formData.total_price = ticket?.price;
                  }}
                  key={ticket?._id}
                  className={`${
                    data?.ticket_name === ticket?.ticket_name || !data
                      ? "bg-gray-600 text-white"
                      : ""
                  } border-2 rounded p-1 text-sm lg:p-3 lg:font-bold cursor-pointer`}
                >
                  {ticket?.ticket_name === "GA" && "GA"}

                  {ticket?.ticket_name === "VIP_Y" && "VIP"}
                  {ticket?.ticket_name === "VIP_B" && "S-VIP"}
                  {ticket?.ticket_name === "VVIP" && "VVIP"}
                  {ticket?.ticket_name === "VVIP_S1" && (
                    <span>S-VVIP GOLD</span>
                  )}
                  {ticket?.ticket_name === "VVIP_S2" && (
                    <span>S-VVIP DIAMOND</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {data.length === 0 ? (
          ""
        ) : (
          <>
            <div>
              <h1>Choose package </h1>
              <div className="flex flex-col gap-5">
                <div className="flex justify-around">
                  {" "}
                  <div>
                    <input
                      type="radio"
                      className="outline-none p-5 mr-2"
                      id="package1"
                      name="package"
                      value="1"
                      checked={formData.package === 1}
                      onChange={handleChange}
                    />
                    <label htmlFor="package1">Package one</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      className="outline-none p-5 mr-2"
                      id="package2"
                      name="package"
                      value="2"
                      checked={formData.package === 2}
                      onChange={handleChange}
                    />
                    <label htmlFor="package2">Package two</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      className="outline-none p-5 mr-2"
                      id="package3"
                      name="package"
                      value="3"
                      checked={formData.package === 3}
                      onChange={handleChange}
                    />
                    <label htmlFor="package3">Package three</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="cursor-pointer flex justify-between border-white bg-gradient-to-r from-zinc-600 to-zinc-500 items-center p-5 rounded-md text-white">
              <p>Quantity : </p>
              <div className="flex items-center gap-2 text-xl bg-white justify-center text-black rounded-md overflow-hidden">
                {data?.ticket_name === "GA" ? (
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
            {/* Extra Person */}
            {data?.ticket_name === "GA" ? (
              ""
            ) : (
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
                      data?.extra_person > extraPerson &&
                        setExtraPerson(extraPerson + 1);
                    }}
                  >
                    +
                  </p>
                </div>
              </div>
            )}
            {/* Total Cost */}
            <div className="flex  items-center">
              <h1 className="text-lg sm:text-3xl font-bold">
                Total Cost :{" "}
                {!data ? "0" : formData?.total_price?.toLocaleString()} MMK
              </h1>
            </div>
            <button
              onClick={() => dataSubmit()}
              className="bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 from-blue-500 to-blue-700 rounded-md p-3 text-white font-bold"
            >
              Buy Ticket
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyTicket;

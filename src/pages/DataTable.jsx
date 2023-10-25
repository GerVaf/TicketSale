import axios from "axios";
import React, { useEffect, useState } from "react";

const DataTable = ({ refresh, setRefresh }) => {
  const [data, setData] = useState([]);
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.ozzy.today/transactions");

        console.log(response);
        setData(response?.data?.result?.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchTicketData = async () => {
      try {
        const response = await axios.get("https://api.ozzy.today/tickets");

        // console.log(response);
        setTicket(response?.data?.result?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTicketData();
    fetchData();
  }, [refresh]);

  console.log(data);
  console.log(ticket);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.ozzy.today/tickets", {
        transaction_id: id,
      });
      console.log(response);

      if (response?.data?.result?.msg === "Successful") {
        // nav("/");
        setRefresh(!refresh);
      }
      // if (response?.data?.status === 400) {
      //   setErrorMessages(response?.data?.err);
      // }
    } catch (error) {
      console.error(error);
    }
    // console.log(formData);
  };

  const formattedDate = (time) => new Date(time).toLocaleString();

  return (
    <div className=" flex flex-col items-center justify-center text-white">
      <div className="flex gap-10 mb-10 text-2xl">
        <div className=" flex flex-col  ">
          <p className=" col-span-1">Name</p>
          <p className=" col-span-1">Total</p>
        </div>
        <div className=" flex gap-10">
          {ticket?.map((el) => {
            return (
              <div>
                <p className=" col-span-1">
                  {el?.ticket_name === "GA" && "GA"}

                  {el?.ticket_name === "VIP_Y" && "VIP"}
                  {el?.ticket_name === "VIP_B" && "S-VIP"}
                  {el?.ticket_name === "VVIP" && "VVIP"}
                  {el?.ticket_name === "VVIP_S1" && (
                    <span>
                      S<sup>1</sup>-VVIP
                    </span>
                  )}
                  {el?.ticket_name === "VVIP_S2" && (
                    <span>
                      S<sup>2</sup>-VVIP
                    </span>
                  )}
                </p>
                <p className=" col-span-1">{el?.whole_total_ticket}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* data tabel */}
      <div className="flex flex-col w-full">
        {/* header  */}
        <div className=" flex items-center gap-5 border p-3 text-center">
          <h1 className="  w-5">No.</h1>
          <p className="  w-[200px]">Name</p>
          <p className=" w-[300px]">Email</p>
          <p className="w-[130px]">Phone</p>
          <p className="w-[400px] ">Transaction Photo</p>
          <p className=" w-20">Quantity</p>
          <p className=" w-20">Extra Person</p>
          <p className=" w-[100px]">Ticket</p>
          <p className="w-32">Total price</p>
          <p className="w-32">Payment Complete</p>
          <p className=" w-32">Time</p>
          <h1 className=" w-20">control</h1>
        </div>
        <div className="flex flex-col-reverse">
          {data?.map((el, index) => {
            return (
              <div key={el?._id} className=" flex items-center gap-5 text-center py-2">
                <p className="  w-5">{index + 1}</p>
                <p className="  text-lg w-[200px]">
                  {el?.customer_id?.bank_acc_name}
                </p>
                <p className=" w-[300px] overflow-x-scroll scrollbar-none">
                  {el?.customer_id?.user_email}
                </p>
                <p className=" w-[130px]">{el?.customer_id?.phone_number}</p>
                <p className="w-[400px] flex justify-center">
                  <img src={el?.t_image} alt="" className="h-52"/>
                </p>
                <p className=" w-20">{el?.quantity}</p>
                <p className=" w-20">{el?.ticket_id?.extra_person}</p>
                <p className=" w-[100px]">
                  {el?.ticket_id?.ticket_name === "GA" && "GA"}

                  {el?.ticket_id?.ticket_name === "VIP_Y" && "VIP"}
                  {el?.ticket_id?.ticket_name === "VIP_B" && "S-VIP"}
                  {el?.ticket_id?.ticket_name === "VVIP" && "VVIP"}
                  {el?.ticket_id?.ticket_name === "VVIP_S1" && (
                    <span>
                      S<sup>1</sup>-VVIP
                    </span>
                  )}
                  {el?.ticket_id?.ticket_name === "VVIP_S2" && (
                    <span>
                      S<sup>2</sup>-VVIP
                    </span>
                  )}
                </p>
                
                <p className="w-32">{el?.total_price}</p>
                <p className="w-32">{el?.t_success === false ? 'No' : 'Yes'}{el?.t_success === null && 'Processing'}</p>
                <p className=" w-32">{formattedDate(el?.createdAt)}</p>
                <p className=" w-24">
                  {el?.sold_out ? (
                    <button className="bg-red-600 p-3 rounded-md">
                      sold out
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleSubmit(e, el?._id)}
                      className="bg-green-600 p-3 rounded-md"
                    >
                      avaiable
                    </button>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataTable;

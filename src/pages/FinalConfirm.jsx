import axios from "axios";
import React, { useState } from "react";

const FinalConfirm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    transactionScreenshot: null,
    selectedOption: "get_by_email",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      transactionScreenshot: file,
    });
  };

  const handleSelectOption = (option) => {
    setFormData({
      ...formData,
      selectedOption: option,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("amount", formData.amount);
    form.append("transactionScreenshot", formData.transactionScreenshot);
    form.append("selectedOption", formData.selectedOption);

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Handle a successful API response here
        console.log("Data sent successfully");
      } else {
        // Handle API errors here
        console.error("Failed to send data to the API");
      }
    } catch (error) {
      // Handle network errors and other exceptions here
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-black flex justify-center">
      <div className="bg-white w-full lg:w-[60%] p-5 sm:p-10 flex flex-col gap-5 items-center">
        <h2 className="text-2xl sm:text-4xl font-bold">Confirmation</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full sm:gap-10 "
        >
          <div className="flex flex-col gap-2">
            <label className="text-lg">Name:</label>
            <input
              className="inputForm"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">Email:</label>
            <input
              className="inputForm"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">Amount:</label>
            <input
              className="inputForm"
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <label className="text-lg">Transaction Screenshot:</label>
            <input
              className="inputForm bg-slate-200"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">Select Option:</label>
            <div className=" grid grid-cols-12 rounded-md overflow-hidden">
              <div
                className={` text-center text-gray-700 ${
                  formData.selectedOption === "get_by_email"
                    ? "bg-slate-200"
                    : "border-2"
                } col-span-6   py-3`}
                onClick={() => handleSelectOption("get_by_email")}
              >
                Get By Email
              </div>
              <div
                className={` text-center text-gray-700 ${
                  formData.selectedOption === "get_by_qr"
                    ? "bg-slate-200"
                    : "border-2"
                } col-span-6   py-3`}
                onClick={() => handleSelectOption("get_by_qr")}
              >
                Get By QR
              </div>
            </div>
          </div>

          <button
            className=" bg-gradient-to-r from-blue-600 to-purple-600 sm:p-4 sm:text-lg p-3 rounded-md text-white font-bold "
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

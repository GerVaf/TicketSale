import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FormSubmit from "./pages/FormSubmit";
import DataTable from "./pages/DataTable";
import { Toaster } from "react-hot-toast";
import FinalConfirm from "./pages/FinalConfirm";
import BuyTicket from "./pages/BuyTicket";
import Fail from "./pages/Fail";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy-ticket" element={<BuyTicket />} />
        <Route path="/final-confirm" element={<FinalConfirm />} />
        <Route
          path="/form-submit"
          element={<FormSubmit refresh={refresh} setRefresh={setRefresh} />}
        />
        <Route path="/fail" element={<Fail />} />

        <Route
          path="/table_7D7TW<b10999O~X~"
          element={<DataTable refresh={refresh} setRefresh={setRefresh} />}
        />
      </Routes>
    </>
  );
};

export default App;

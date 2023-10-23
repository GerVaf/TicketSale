import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FormSubmit from "./pages/FormSubmit";
import DataTable from "./pages/DataTable";
import TicketPackage from "./pages/TicketPackage";
import { Toaster } from "react-hot-toast";
import Payments from "./pages/Payments";
import Final from "./pages/Final";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/final" element={<Final />} />
        <Route
          path="/form-submit"
          element={<FormSubmit refresh={refresh} setRefresh={setRefresh} />}
        />
        <Route
          path="/table_7D7TW<b10999O~X~"
          element={<DataTable refresh={refresh} setRefresh={setRefresh} />}
        />
      </Routes>
    </>
  );
};

export default App;

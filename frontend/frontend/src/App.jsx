import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Admin/Login";
import { useDispatch } from "react-redux";
import { adminAuthenticationAction } from "./Redux/actions/admin";
import AddStaff from "./Components/Admin/AddStaff";
import Dashboard from "./Components/Admin/Dashboard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminAuthenticationAction());
  });

  return (
    <div className="font-roboto bg-zinc-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/admin/login" element={<Login />}></Route>
          <Route path="/admin/add_staff" element={<AddStaff />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
